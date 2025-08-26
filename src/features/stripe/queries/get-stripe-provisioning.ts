import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const getStripeProvisioningByOrganization = async (
  organizationId: string | null | undefined,
) => {
  if (!organizationId) {
    return {
      allowedMembers: 0,
      currentMembers: 0,
    };
  }
};
