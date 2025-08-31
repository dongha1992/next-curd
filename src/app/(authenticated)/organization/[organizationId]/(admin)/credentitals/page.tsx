import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { CredentialCreateButton } from '@/features/credential/components/credential-create-button';
import { CredentialList } from '@/features/credential/components/credential-list';
import { OrganizationBreadcrumbs } from '../_navigation/tabs';

type CredentialsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const CredentialsPage = async ({ params }: CredentialsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="보안"
        description="허용 가능한 API를 설정하자."
        tabs={<OrganizationBreadcrumbs />}
        actions={<CredentialCreateButton organizationId={organizationId} />}
      />

      <Suspense fallback={<Spinner />}>
        <CredentialList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default CredentialsPage;
