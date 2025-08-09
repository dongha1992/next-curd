'use server';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { getOrganizationsByUser } from '@/features/organization/queries/get-organizations-by-user';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';
import { revalidatePath } from 'next/cache';

export const switchOrganization = async (organizationId: string) => {
  const { user } = await getAuthOrRedirect({
    checkActiveOrganization: false,
  });
  try {
    const organizations = await getOrganizationsByUser();

    const canSwitch = organizations.some(
      (organization) => organization.id === organizationId,
    );

    if (!canSwitch) {
      return toActionState('ERROR', '해당 그룹의 멤버가 아닙니다.');
    }

    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: {
          not: organizationId,
        },
      },
      data: {
        isActive: false,
      },
    });

    await prisma.membership.update({
      where: {
        membershipId: {
          userId: user.id,
          organizationId,
        },
      },
      data: {
        isActive: true,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath(organizationsPath());
  return toActionState('SUCCESS', '그룹을 활성화하였습니다.');
};
