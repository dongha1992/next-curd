import { redirect } from 'next/navigation';
import { emailVerificationPath, signInPath } from '@/paths';
import { getAuth } from '@/features/auth/queries/get-auth';

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

export const getAuthOrRedirect = async (options?: GetAuthOrRedirectOptions) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  return auth;
};
