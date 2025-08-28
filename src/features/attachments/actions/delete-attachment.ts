'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import * as attachmentData from '../data';
import * as attachmentSubjectDTO from '../dto/attachment-subject-dto';

export const deleteAttachment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const attachment = await attachmentData.getAttachment(id);
  let subject;

  switch (attachment?.entity) {
    case 'TRADING': {
      subject = attachmentSubjectDTO.fromTrading(attachment.trading);
      break;
    }
    case 'COMMENT': {
      subject = attachmentSubjectDTO.fromComment(attachment.comment);
      break;
    }
  }

  if (!subject || !attachment) {
    return toActionState('ERROR', '잘못된 첨부파일 입니다.');
  }

  if (!isOwner(user, subject)) {
    return toActionState('ERROR', '삭제 권한이 없습니다.');
  }

  try {
    await prisma.attachment.delete({
      where: {
        id,
      },
    });

    await inngest.send({
      name: 'app/attachment.deleted',
      data: {
        organizationId: subject.organizationId,
        entityId: subject.entityId,
        entity: attachment.entity,
        fileName: attachment.name,
        attachmentId: attachment.id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState('SUCCESS', '첨부파일이 삭제되었습니다.');
};
