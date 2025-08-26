'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAdminOrRedirect } from '@/features/membership/queries/get-admin-or-redirect';
import { getStripeProvisioningByOrganization } from '@/features/stripe/queries/get-stripe-provisioning';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { invitationsPath } from '@/paths';
import { generateInvitationLink } from '../utils/generate-invitation-link';

const createInvitationSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
});

export const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAdminOrRedirect(organizationId);

  //
  // const { allowedMembers, currentMembers } =
  //   await getStripeProvisioningByOrganization(organizationId);

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get('email'),
    });

    const targetMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });
    if (targetMembership) {
      return toActionState('ERROR', '이미 그룹에 속한 멤버입니다.');
    }

    const emailInvitationLink = await generateInvitationLink(
      user.id,
      organizationId,
      email,
    );
    await inngest.send({
      name: 'app/invitation.created',
      data: {
        userId: user.id,
        organizationId,
        email,
        emailInvitationLink,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));

  return toActionState('SUCCESS', '초대 되었습니다.');
};
