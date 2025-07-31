'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import z from 'zod';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetLink } from '@/features/password/utils/generate-password-reset-link';

const passwordForgotSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
});

export const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { email } = passwordForgotSchema.parse({
      email: formData.get('email'),
    });
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState('SUCCESS', '없는 계정입니다.');
    }
    const passwordResetLink = await generatePasswordResetLink(user.id);
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  return toActionState('SUCCESS', '이메일로 링크를 발송했습니다.');
};
