'use server';

import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { verifyPasswordHash } from '@/features/password/utils/hash-and-verify';

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});
export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const auth = await getAuthOrRedirect();
  try {
    const { password } = passwordChangeSchema.parse({
      password: formData.get('password'),
    });

    const user = await prisma.user.findUnique({
      where: { email: auth.user.email },
    });

    if (!user) {
      return toActionState('ERROR', '잘못된 요청입니다.', formData);
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState('ERROR', '잘못된 비밀번호입니다.', formData);
    }
    // TODO: inngest
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  return toActionState('SUCCESS', '초기화 링크를 전송하였습니다.');
};
