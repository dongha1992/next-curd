import { ParsedSearchParams } from '@/features/trading/search-params';
import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';
import { getActiveOrganization } from '@/features/organization/queries/get-active-organization';
import { PAGE_SIZES } from '@/components/pagination/constants';
import { getOrganizationsByUser } from '@/features/organization/queries/get-organizations-by-user';

export const getTradings = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();

  const activeOrganization = await getActiveOrganization();

  if (!PAGE_SIZES.includes(searchParams.size)) {
    throw new Error('Invalid page size');
  }

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: 'insensitive' as const,
    },
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
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

  const organizationsByUser = await getOrganizationsByUser();

  return {
    list: tradings.map((trading) => {
      const organization = organizationsByUser.find(
        (organization) => organization.id === trading.organizationId,
      );

      return {
        ...trading,
        isOwner: isOwner(user, trading),
        permissions: {
          canDeleteTrading:
            isOwner(user, trading) &&
            !!organization?.membershipByUser.canDeleteTrading,
        },
      };
    }),

    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
