import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { InvitationCreateButton } from '@/features/invitation/components/invitation-create-button';
import { MembershipList } from '@/features/membership/components/membership-list';
import { OrganizationBreadcrumbs } from '../_navigation/tabs';

type MembershipsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { organizationId } = await params;
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="그룹 관리하기"
        description="그룹 인원을 관리해보세요"
        tabs={<OrganizationBreadcrumbs />}
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />

      <Suspense fallback={<Spinner />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};
export default MembershipsPage;
