'use server';

import { MembershipRole } from '@prisma/client';
import { getAdminOrRedirect } from '@/features/membership/queries/get-admin-or-redirect';
import { toActionState } from '@/components/form/utils/to-action-state';
import { revalidatePath } from 'next/cache';
import { membershipsPath } from '@/paths';
import { getMemberships } from '@/features/membership/queries/get-memberships';

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);

  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState('ERROR', '멤버를 찾을 수 없습니다.');
  }

  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === 'ADMIN',
  );

  const removesAdmin = targetMembership.membershipRole === 'ADMIN';
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState('ERROR', '최소 한 명의 어드민은 있어야 합니다.');
  }

  await prisma.membership.update({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(membershipsPath(organizationId));
  return toActionState('SUCCESS', '권한이 업데이트 됐습니다.');
};
