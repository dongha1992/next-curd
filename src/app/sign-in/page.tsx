import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { passwordForgotPath, signUpPath } from '@/paths';

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              회원가입 하기
            </Link>

            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              비밀번호 찾기
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
