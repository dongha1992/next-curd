import { getOrganizationsByUser } from '@/features/organization/queries/get-organizations-by-user';
import { onboardingPath, organizationsPath } from '@/paths';
import { redirect } from 'next/navigation';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LucidePlus } from 'lucide-react';
import { Suspense } from 'react';
import { OrganizationList } from '@/features/organization/components/organization-list';
import { Spinner } from '@/components/spinner';

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some((organization) => {
    return organization.membershipByUser.isActive;
  });

  if (hasActive) {
    redirect(organizationsPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="그룹 선택"
        description="그룹을 선택하세요."
        actions={
          <Button asChild>
            <Link href={onboardingPath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList limitedAccess />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
