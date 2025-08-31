import { Heading } from '@/components/heading';
import { OrganizationBreadcrumbs } from '@/app/(authenticated)/organization/[organizationId]/(admin)/_navigation/tabs';
import { LucideSettings } from 'lucide-react';
import { Suspense } from 'react';
import { Spinner } from '@/components/spinner';
import { Products } from '@/features/stripe/components/product';

type SubscriptionPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const SubscriptionPage = async ({ params }: SubscriptionPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="구독"
        description="구독 관리"
        tabs={<OrganizationBreadcrumbs />}
        actions={
          <CustomerPortalForm organizationId={organizationId}>
            <>
              <LucideSettings className="w-4 h-4" />
              Manage Subscription
            </>
          </CustomerPortalForm>
        }
      />

      <Suspense fallback={<Spinner />}>
        <Products organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default SubscriptionPage;
