'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import z from 'zod';
import { hashToken } from '@/utils/crypto';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/features/password/utils/hash-and-verify';
import { setCookieByKey } from '@/actions/cookies';
import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';

const passwordResetSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '패스워드가 맞지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: {
          tokenHash,
        },
      });
    }

    // TODO: 없는 경우?
    if (!passwordResetToken) return;

    const isExpired = Date.now() > passwordResetToken.expiresAt.getTime();

    if (!passwordResetToken || isExpired) {
      return toActionState('ERROR', '잘못된 토큰입니다.', formData);
    }

    await prisma.session.deleteMany({
      where: { userId: passwordResetToken.userId },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        passwordHash,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey('toast', '비밀번호를 초기화했습니다.');
  redirect(signInPath());
};
