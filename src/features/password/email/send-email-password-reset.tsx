import EmailPasswordReset from '@/emails/password/email-password-reset';
import { resend } from '@/lib/resend';

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string,
) => {
  return await resend.emails.send({
    from: 'app@next-crud.com',
    to: email,
    subject: '비밀번호 초기화',
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
  });
};
