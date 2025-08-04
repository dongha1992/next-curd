import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardCompact } from '@/components/card-compact';
import { Separator } from '@/components/ui/separator';
import { getTrading } from '@/features/trading/queries/get-trading';
import { homePath, tradingPath } from '@/paths';
import { notFound } from 'next/navigation';
import { TradingUpsertForm } from '@/features/trading/components/trading-upsert-form';

type TradingEditPageProps = {
  params: Awaited<{ tradingId: string }>;
};

const TradingEditPage = async ({ params }: TradingEditPageProps) => {
  const { tradingId } = await params;

  const trading = await getTrading(tradingId);
  const isTradingFound = !!trading;

  if (!isTradingFound || !trading.isOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tradings', href: homePath() },
          { title: trading.title, href: tradingPath(trading.id) },
          { title: 'Edit' },
        ]}
      />

      <Separator />

      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Trading"
          description="Edit an existing trading"
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<TradingUpsertForm trading={trading} />}
        />
      </div>
    </div>
  );
};

export default TradingEditPage;
