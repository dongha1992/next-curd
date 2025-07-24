'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/quries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { tradingPath } from '@/paths';
import z from 'zod';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  tradingId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  let comment;
  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));
    comment = await prisma.comment.create({
      data: {
        userId: user.id,
        tradingId: tradingId,
        ...data,
      },
      include: {
        user: true,
      },
    });
  } catch (err) {
    return fromErrorToActionState(err);
  }

  revalidatePath(tradingPath(tradingId));
  return toActionState('SUCCESS', 'Comment created', undefined, {
    ...comment,
    isOwner: true,
  });
};
