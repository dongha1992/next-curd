'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import { tradingsPath } from '@/paths';
import { redirect } from 'next/navigation';

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
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  redirect(tradingsPath());
};
