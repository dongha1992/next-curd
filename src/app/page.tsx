import { TradingList } from '@/features/trading/components/trading-list';
import { Heading } from '@/components/heading';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="오늘 매매"
        description="수익을 당연하게 여기는 생각은 주가가 큰 폭으로 하락하면 확실하게 치유된다."
      />
      <div>
        <TradingList />
      </div>
    </div>
  );
}
