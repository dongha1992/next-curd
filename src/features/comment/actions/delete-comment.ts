'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/quries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';
import { tradingPath } from '@/paths';
import { revalidatePath } from 'next/cache';

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState('ERROR', 'Not authorized');
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath(tradingPath(comment.tradingId));

  return toActionState('SUCCESS', 'Comment deleted');
};
