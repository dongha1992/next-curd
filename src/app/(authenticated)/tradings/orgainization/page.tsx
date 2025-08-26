import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { CardCompact } from '@/components/card-compact';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TradingList } from '@/features/trading/components/trading-list';
import { TradingUpsertForm } from '@/features/trading/components/trading-upsert-form';
import { searchParamsCache } from '@/features/trading/search-params';

type TradingsByOrganizationPageProps = {
  searchParams: Promise<SearchParams>;
};

const TradingsByOrganizationPage = async ({
  searchParams,
}: TradingsByOrganizationPageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="우리의 매" description="그룹의 매매를 모아서 보자" />

      <CardCompact
        title="Create Trading"
        description="A new trading will be created"
        className="w-full max-w-[420px] self-center"
        content={<TradingUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TradingList
          byOrganization
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TradingsByOrganizationPage;
