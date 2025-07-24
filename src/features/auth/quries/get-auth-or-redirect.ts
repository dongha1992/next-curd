import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from '@/features/auth/quries/get-auth';

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
};
