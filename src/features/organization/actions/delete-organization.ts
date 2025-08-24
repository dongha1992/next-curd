'use server';

import { getAdminOrRedirect } from '@/features/membership/queries/get-admin-or-redirect';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getOrganizationsByUser } from '@/features/organization/queries/get-organizations-by-user';
import { organizationsPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);
  try {
    const organizations = await getOrganizationsByUser();
    const canDelete = organizations.some(
      (organization) => organization.id === organizationId,
    );

    if (!canDelete) {
      return toActionState('ERROR', '그룹을 삭제할 수 없습니다.');
    }

    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath(organizationsPath());

  return toActionState('SUCCESS', '그룹이 삭제되었습니다.');
};
