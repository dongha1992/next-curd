import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export type OrganizationCreateEventArgs = {
  data: {
    organizationId: string;
    byEmail: string;
  };
};

export const organizationCreatedEvent = inngest.createFunction(
  { id: 'organization-created' },
  { event: 'app/organization.created' },
  async ({ event }) => {
    const { organizationId, byEmail } = event.data;

    return { event, body: true };
  },
);
