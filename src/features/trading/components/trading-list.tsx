import { Placeholder } from '@/components/placeholder';
import { TradingItem } from '@/features/trading/components/trading-item';
import { ParsedSearchParams } from '@/features/trading/search-params';
import { getTradings } from '@/features/trading/queries/get-tradings';
import { TradingPagination } from './trading-pagination';
import { TradingSearchInput } from './trading-search-input';
import { TradingSortSelect } from '@/features/trading/components/trading-sort-select';

type TradingListProps = {
  userId?: string;
  byOrganization?: boolean;
  searchParams: ParsedSearchParams;
};

const TradingList = async ({
  userId,
  byOrganization = false,
  searchParams,
}: TradingListProps) => {
  const { list: tradings, metadata: tradingMetadata } = await getTradings(
    userId,
    byOrganization,
    searchParams,
  );

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full flex-col gap-y-4 max-w-[420px] flex gap-x-2">
        <TradingSearchInput placeholder="매매 기록을 검색해보세요." />
        <TradingSortSelect
          options={[
            {
              sortKey: 'createdAt',
              sortValue: 'desc',
              label: 'Newest',
            },
            {
              sortKey: 'createdAt',
              sortValue: 'asc',
              label: 'Oldest',
            },
            {
              sortKey: 'bounty',
              sortValue: 'desc',
              label: 'Bounty',
            },
          ]}
        />
        {tradings.length ? (
          tradings.map((trading) => (
            <TradingItem key={trading.id} trading={trading} />
          ))
        ) : (
          <Placeholder label="게시글이 없습니다." />
        )}
        <div className="w-full max-w-[420px]">
          <TradingPagination paginatedTradingMetadata={tradingMetadata} />
        </div>
      </div>
    </div>
  );
};

export { TradingList };
