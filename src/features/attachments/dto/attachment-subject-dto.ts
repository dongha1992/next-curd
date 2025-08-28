import { AttachmentEntity } from '@prisma/client';
import { AttachmentSubject, isComment, isTrading } from '../types';

export type Type = {
  entityId: string;
  entity: AttachmentEntity;
  organizationId: string;
  userId: string | null;
  tradingId: string;
  commentId: string | null;
};

export const fromTrading = (trading: AttachmentSubject | null) => {
  if (!trading || !isTrading(trading)) {
    return null;
  }

  return {
    entity: 'TRADING' as AttachmentEntity,
    entityId: trading.id,
    organizationId: trading.organizationId,
    userId: trading.userId,
    tradingId: trading.id,
    commentId: null,
  };
};

export const fromComment = (comment: AttachmentSubject | null) => {
  if (!comment || !isComment(comment)) {
    return null;
  }

  return {
    entity: 'COMMENT' as AttachmentEntity,
    entityId: comment.id,
    organizationId: comment.trading.organizationId,
    userId: comment.userId,
    tradingId: comment.trading.id,
    commentId: comment.id,
  };
};
