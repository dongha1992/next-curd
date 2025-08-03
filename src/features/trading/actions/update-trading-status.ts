'use server';

import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { revalidatePath } from 'next/cache';
import { tradingsPath } from '@/paths';
import { TradingStatus } from '@prisma/client';

export const updateTradingStatus = async (
  id: string,
  status: TradingStatus,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const trading = await prisma.trading.findUnique({
      where: {
        id,
      },
    });

    if (!trading || !isOwner(user, trading)) {
      return toActionState('ERROR', 'Not authorized');
    }

    await prisma.trading.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath(tradingsPath());

  return toActionState('SUCCESS', 'Status updated');
};
