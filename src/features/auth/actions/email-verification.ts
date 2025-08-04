'use server';

import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { setCookieByKey } from '@/actions/cookies';
import { redirect } from 'next/navigation';
import { tradingsPath } from '@/paths';
import { prisma } from '@/lib/prisma';
import { validateEmailVerificationCode } from '../utils/validate-email-verification-code';

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });
  try {
    const { code } = emailVerificationSchema.parse({
      code: formData.get('code'),
    });

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code,
    );

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey('toast', '이메일이 인증되었습니다');
  redirect(tradingsPath());
};
