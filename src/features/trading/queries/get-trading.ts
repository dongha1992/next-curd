import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';

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

  return { ...trading, isOwner: isOwner(user, trading) };
};
