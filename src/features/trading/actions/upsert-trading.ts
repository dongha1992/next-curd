'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { isOwner } from '@/features/auth/utils/is-owner';
import { setCookieByKey } from '@/actions/cookies';
import { redirect } from 'next/navigation';
import { tradingPath, tradingsPath } from '@/paths';
import { revalidatePath } from 'next/cache';

const upsertTradingSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
});

export const upsertTrading = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const trading = await prisma.trading.findUnique({
        where: {
          id,
        },
      });
      if (!trading || !isOwner(user, trading)) {
        return toActionState('ERROR', 'Not authorized');
      }
    }

    const data = upsertTradingSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      userId: user.id,
    };

    await prisma.trading.upsert({
      where: { id: id || '' },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(tradingsPath());

  if (id) {
    await setCookieByKey('toast', 'Trading updated');
    redirect(tradingPath(id));
  }
  return toActionState('SUCCESS', 'Trading created');
};
