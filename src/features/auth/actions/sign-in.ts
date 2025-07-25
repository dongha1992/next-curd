'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { verifyPasswordHash } from '@/features/password/utils/hash-and-verify';
import { generateRandomToken } from '@/utils/crypto';
import { createSession } from '@/lib/lucia';
import { setSessionCookie } from '@/features/auth/utils/session-cookies';
import { redirect } from 'next/navigation';
import { tradingsPath } from '@/paths';

const signInSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
  password: z.string().min(6).max(191),
});
export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState('ERROR', '계정 정보가 잘못되었습니다.', formData);
    }
    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState('ERROR', '계정 정보가 잘못되었습니다.', formData);
    }

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  redirect(tradingsPath());
};
