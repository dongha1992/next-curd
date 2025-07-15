import { Placeholder } from '@/components/placeholder';

const TradingList = () => {
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <Placeholder label="No tickets found" />
      </div>
    </div>
  );
};

export { TradingList };
