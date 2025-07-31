type PasswordResetPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};
const PasswordResetPage = async ({ params }: PasswordResetPageProps) => {};
export default PasswordResetPage;
