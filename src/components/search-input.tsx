import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    250,
  );
  return (
    <Input
      defaultValue={value}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};
export { SearchInput };
