'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import * as attachmentSubjectDTO from '@/features/attachments/dto/attachment-subject-dto';
import { revalidatePath } from 'next/cache';
import { tradingPath } from '@/paths';
import z from 'zod';
import { filesSchema } from '@/features/attachments/schema/files';
import * as attachmentService from '@/features/attachments/service';
import * as commentData from '../data';
import * as tradingData from '@/features/trading/data';
import { findIdsFromText } from '@/utils/find-ids-from-text';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
  files: filesSchema,
});

export const createComment = async (
  tradingId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  let comment;

  try {
    const { content, files } = createCommentSchema.parse({
      content: Object.fromEntries(formData),
      files: formData.getAll('files'),
    });

    comment = await commentData.createComment({
      userId: user.id,
      tradingId,
      content,
      options: {
        includeUser: true,
        includeTrading: true,
      },
    });

    const subject = attachmentSubjectDTO.fromComment(comment);

    if (!subject) {
      return toActionState('ERROR', '첨부파일을 찾지 못 했습니다.');
    }

    await attachmentService.createAttachments({
      subject: subject,
      entity: 'COMMENT',
      entityId: comment.id,
      files,
    });

    await tradingData.connectReferencedTradings(
      tradingId,
      findIdsFromText('tradings', content),
    );
  } catch (err) {
    return fromErrorToActionState(err);
  }

  revalidatePath(tradingPath(tradingId));
  return toActionState('SUCCESS', 'Comment created', undefined, {
    ...comment,
    isOwner: true,
  });
};
