'use server';

import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from '@/features/auth/queries/get-auth';
import { invalidateSession } from '@/lib/lucia';
import { deleteSessionCookie } from '@/features/auth/utils/session-cookies';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
