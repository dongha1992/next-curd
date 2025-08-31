export const homePath = () => '/';

export const pricingPath = () => '/pricing';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';

export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';

export const passwordForgotPath = () => '/password-forgot';
export const passwordResetPath = () => '/password-reset';

export const emailVerificationPath = () => '/email-verification';
export const emailInvitationPath = () => '/email-invitation';

export const onboardingPath = () => '/onboarding';
export const selectActiveOrganizationPath = () =>
  '/onboarding/select-active-organization';

export const tradingsPath = () => '/tradings';
export const tradingsByOrganizationPath = () => '/tradings/organization';
export const tradingPath = (tradingId: string) => `/tradings/${tradingId}`;
export const tradingEditPath = (tradingId: string) =>
  `/tradings/${tradingId}/edit`;

export const membershipsPath = (organizationId: string) =>
  `/organization/${organizationId}/memberships`;
export const invitationsPath = (organizationId: string) =>
  `/organization/${organizationId}/invitations`;
export const credentialsPath = (organizationId: string) =>
  `/organization/${organizationId}/credentials`;
export const subscriptionPath = (organizationId: string) =>
  `/organization/${organizationId}/subscription`;

export const organizationsPath = () => '/organization';
export const organizationCreatePath = () => '/organization/create';

export const attachmentDownloadPath = (attachmentId: string) =>
  `/api/aws/s3/attachments/${attachmentId}`;
