'use server';

import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { revalidatePath } from 'next/cache';
import { setCookieByKey } from '@/actions/cookies';
import { tradingsPath } from '@/paths';
import { redirect } from 'next/navigation';
import { getTradingPermissions } from '@/features/trading/permissions/get-trading-permissions';

export const deleteTrading = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const trading = await prisma.trading.findUnique({
      where: {
        id,
      },
    });

    if (!trading || !isOwner(user, trading)) {
      return { success: false, error: 'Not authorized' };
    }

    const permissions = await getTradingPermissions({
      organizationId: trading.organizationId,
      userId: user.id,
    });

    if (!permissions.canDeleteTrading) {
      return toActionState('ERROR', 'Not authorized');
    }

    await prisma.trading.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(tradingsPath());
  await setCookieByKey('toast', 'Trading deleted');
  redirect(tradingsPath());
};
