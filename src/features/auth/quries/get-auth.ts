'use server';

//TODO: cache 테스트

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/features/auth/utils/session-cookies';
import { validateSession } from '@/lib/lucia';

export const getAuth = async () => {
  const sessionToken =
    (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionToken) {
    return {
      user: null,
      session: null,
    };
  }

  return await validateSession(sessionToken);
};
