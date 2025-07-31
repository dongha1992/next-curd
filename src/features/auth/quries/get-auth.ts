'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/features/auth/utils/session-cookies';
import { validateSession } from '@/lib/lucia';
import { cache } from 'react';

export const getAuth = cache(async () => {
  const sessionToken =
    (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionToken) {
    return {
      user: null,
      session: null,
    };
  }

  return await validateSession(sessionToken);
});
