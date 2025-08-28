import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';
import { getTradingPermissions } from '@/features/trading/permissions/get-trading-permissions';

export const getTrading = async (id: string) => {
  const { user } = await getAuth();

  const trading = await prisma.trading.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!trading) {
    return null;
  }

  const permissions = await getTradingPermissions({
    organizationId: trading.organizationId,
    userId: user?.id,
  });

  return {
    ...trading,
    isOwner: isOwner(user, trading),
    permissions: {
      canDeleteTrading:
        isOwner(user, trading) && !!permissions.canDeleteTrading,
    },
  };
};
