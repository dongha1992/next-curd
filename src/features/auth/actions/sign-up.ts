'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { tradingsPath } from '@/paths';
import { redirect } from 'next/navigation';
import { hashPassword } from '@/features/password/utils/hash-and-verify';
import { prisma } from '@/lib/prisma';
import { generateRandomToken } from '@/utils/crypto';
import { createSession } from '@/lib/lucia';
import { setSessionCookie } from '@/features/auth/utils/session-cookies';
import { Prisma } from '@prisma/client';
import { inngest } from '@/lib/inngest';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces',
      ),
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
    // const verificationCode = await generateEmailVerificationCode(
    //   user.id,
    //   email,
    // );
    // await sendEmailVerification(username, email, verificationCode);

    await inngest.send({
      name: 'app/auth.sign-up',
      data: {
        userId: user.id,
      },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toActionState('ERROR', '이미 있는 계정입니다.', formData);
    }
    return fromErrorToActionState(error, formData);
  }
  redirect(tradingsPath());
};
