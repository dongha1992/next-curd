import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

export const getAdminOrRedirect = async (organizationId: string) => {
  const auth = await getAuthOrRedirect();
};
