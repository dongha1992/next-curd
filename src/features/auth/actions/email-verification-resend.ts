'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { canResendVerificationEmail } from '@/utils/can-resend-verification-email';
import { generateEmailVerificationCode } from '@/features/auth/utils/generate-email-verification-code';
import { sendEmailVerification } from '../emails/send-email-verification';

export const emailVerificationResend = async () => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const canResend = await canResendVerificationEmail(user.id);

    if (!canResend) {
      return toActionState('ERROR', '1분 후 재발송 가능합니다.');
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode,
    );

    if (result.error) {
      return toActionState('ERROR', '인증코드 발송에 실패했습니다.');
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }
  return toActionState('SUCCESS', '인증 메일이 발송되었습니다.');
};
