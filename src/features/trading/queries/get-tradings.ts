import { ParsedSearchParams } from '@/features/trading/search-params';
import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';

export const getTradings = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: 'insensitive' as const,
    },
  };

  const skip = searchParams.size * searchParams.page;
  const take = searchParams.size;

  const [tradings, count] = await prisma.$transaction([
    prisma.trading.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.trading.count({
      where,
    }),
  ]);

  return {
    list: tradings.map((trading) => ({
      ...trading,
      isOwner: isOwner(user, trading),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
