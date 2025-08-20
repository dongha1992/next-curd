import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

export const getMemberships = async (organizationId: string) => {
  await getAuthOrRedirect();
};
