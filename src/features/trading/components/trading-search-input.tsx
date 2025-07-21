'use client';

import { useQueryState } from 'nuqs';
import { searchParser } from '@/features/trading/search-params';
import { SearchInput } from '@/components/search-input';

type SearchInputProps = {
  placeholder: string;
};

const TradingSearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};

export { TradingSearchInput };
