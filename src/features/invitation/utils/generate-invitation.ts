import { prisma } from '@/lib/prisma';
import { generateRandomToken, hashToken } from '@/utils/crypto';
import { getBaseUrl } from '@/utils/url';
import { emailInvitationPath } from '@/paths';

export const generateInvitationLink = async (
  invitedByUserId: string,
  organizationId: string,
  email: string,
) => {
  await prisma.invitation.deleteMany({
    where: {
      email,
      organizationId,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      tokenHash,
      invitedByUserId,
      organizationId,
      email,
    },
  });
  const pageUrl = getBaseUrl() + emailInvitationPath();
  const emailInvitationLink = pageUrl + `/${tokenId}`;

  return emailInvitationLink;
};
