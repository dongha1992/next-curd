export const homePath = () => '/';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';

export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';

export const passwordForgotPath = () => '/password-forgot';
export const passwordResetPath = () => '/password-reset';

export const emailVerificationPath = () => '/email-verification';
export const emailInvitationPath = () => '/email-invitation';

export const tradingsPath = () => '/tradings';
export const tradingPath = (tradingId: string) => `/tradings/${tradingId}`;
export const tradingEditPath = (tradingId: string) =>
  `/tradings/${tradingId}/edit`;
