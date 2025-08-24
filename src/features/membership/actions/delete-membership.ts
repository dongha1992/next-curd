'use server';

import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { getMemberships } from '@/features/membership/queries/get-memberships';
import { toActionState } from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { membershipsPath } from '@/paths';

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const { user } = await getAuthOrRedirect();
  const memberships = await getMemberships(organizationId);

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toActionState('ERROR', '최소 하나의 멤버는 있어야 합니다.');
  }

  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState('ERROR', '찾을 수 없습니다.');
  }

  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === 'ADMIN',
  );

  const removesAdmin = targetMembership.membershipRole === 'ADMIN';
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState('ERROR', '최소 하나의 어드민 계정은 있어야 합니다.');
  }

  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user?.id,
  );

  const isMyself = user.id === userId;
  const isAdmin = myMembership?.membershipRole === 'ADMIN';

  if (!isMyself && !isAdmin) {
    return toActionState('ERROR', '삭제 권한이 없습니다.');
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  // revalidatePath(membershipsPath(organizationId));
};
