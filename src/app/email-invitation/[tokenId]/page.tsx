import { CardCompact } from '@/components/card-compact';
import { InvitationAcceptForm } from '@/features/invitation/components/invitation-accept-form';

type EmailInvitationPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const EmailInvitationPage = async ({ params }: EmailInvitationPageProps) => {
  const { tokenId } = await params;
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="그룹에 참가하기"
        description="그룹에 참가해보세요"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<InvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  );
};
export default EmailInvitationPage;
