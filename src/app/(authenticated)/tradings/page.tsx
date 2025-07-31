import { SearchParams } from 'nuqs';
import { getAuth } from '@/features/auth/quries/get-auth';
import { Heading } from '@/components/heading';
import { searchParamsCache } from '@/features/trading/search-params';
import { TradingList } from '@/features/trading/components/trading-list';
import { CardCompact } from '@/components/card-compact';
import { TradingUpsertForm } from '@/features/trading/components/trading-upsert-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/spinner';

type TradingsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TradingsPage = async ({ searchParams }: TradingsPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="나의 매매" description="신죠오 사사게요!!" />

      <CardCompact
        title="Create Trading"
        description="A new trading will be created"
        className="w-full max-w-[420px] self-center"
        content={<TradingUpsertForm />}
      />
      <Suspense fallback={<Spinner />}>
        <TradingList
          userId={user?.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TradingsPage;
