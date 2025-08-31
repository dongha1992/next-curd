import { findIdsFromText } from '@/utils/find-ids-from-text';
import { Comment } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import * as tradingService from '@/features/trading/service';

export const disconnectReferencedTradings = async (comment: Comment) => {
  const tradingId = comment.tradingId;
  const tradingIds = findIdsFromText('tradings', comment.content);

  if (!tradingId.length) return;

  const comments = await prisma.comment.findMany({
    where: {
      tradingId: comment.tradingId,
      id: {
        not: comment.id,
      },
    },
  });

  const allOtherContent = comments.map((comment) => comment.content).join(' ');
  const allOtherTradingIds = findIdsFromText('tradings', allOtherContent);

  const tradingIdsToRemove = tradingIds.filter(
    (tradingId) => !allOtherTradingIds.includes(tradingId),
  );

  await prisma.trading.update({
    where: {
      id: tradingId,
    },

    data: {
      referencedTradings: {
        disconnect: tradingIdsToRemove.map((id) => ({
          id,
        })),
      },
    },
  });
};
