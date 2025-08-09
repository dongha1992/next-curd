import EmailVerification from '@/emails/auth/email-verification';
import { resend } from '@/lib/resend';

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string,
) => {
  return await resend.emails.send({
    from: 'no-reply@next-crud.com',
    to: email,
    subject: '이메일 인증 코드',
    react: <EmailVerification toName={username} code={verificationCode} />,
  });
};
