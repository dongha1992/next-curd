import { LucidePlus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { OrganizationList } from '@/features/organization/components/organization-list';
import { organizationCreatePath } from '@/paths';

const OrganizationsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="그룹"
        description="그룹을 조직하자"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              그룹 생성하기
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
