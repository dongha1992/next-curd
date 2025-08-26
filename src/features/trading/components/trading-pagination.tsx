'use client';

import { PaginatedData } from '@/types/pagination';
import { TradingWithMetadata } from '@/features/trading/types';
import { Pagination } from '@/components/pagination/pagination';
import { useQueryState, useQueryStates } from 'nuqs';
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '@/features/trading/search-params';
import { useEffect, useRef } from 'react';

type TradingPaginationProps = {
  paginatedTradingMetadata: PaginatedData<TradingWithMetadata>['metadata'];
};

const TradingPagination = ({
  paginatedTradingMetadata,
}: TradingPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  const [search] = useQueryState('search', searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTradingMetadata}
    />
  );
};

export { TradingPagination };
