import { CardCompact } from '@/components/card-compact';
import { EmailVerificationForm } from '@/features/auth/components/email-verification-form';
import { EmailVerificationResendForm } from '@/features/auth/components/email-verification-resend-form';

const EmailVerificationPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Verify Email"
        description="이메일 인증 진행하기"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={
          <div className="flex flex-col gap-y-2">
            <EmailVerificationForm />
            <EmailVerificationResendForm />
          </div>
        }
      />
    </div>
  );
};

export default EmailVerificationPage;
