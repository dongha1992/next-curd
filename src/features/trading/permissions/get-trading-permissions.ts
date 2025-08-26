import { prisma } from '@/lib/prisma';

type GetTradingPermissions = {
  organizationId: string | undefined;
  userId: string | undefined;
};

export const getTradingPermissions = async ({
  organizationId,
  userId,
}: GetTradingPermissions) => {
  if (!organizationId || !userId) {
    return {
      canDeleteTrading: false,
    };
  }

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });
  if (!membership) {
    return {
      canDeleteTrading: false,
    };
  }
  return {
    canDeleteTrading: membership.canDeleteTrading,
  };
};
