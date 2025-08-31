import { Breadcrumbs } from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { homePath } from '@/paths';
import { TradingItem } from '@/features/trading/components/trading-item';
import { Comments } from '@/features/comment/components/comments/comment';
import { getTrading } from '@/features/trading/queries/get-trading';
import { getComments } from '@/features/comment/queries/get-comments';
import { notFound } from 'next/navigation';
import { Attachments } from '@/features/attachments/components/attachments';
import { ReferencedTradings } from '@/features/trading/components/referenced-tradings';

type TradingPageProps = {
  params: {
    tradingId: string;
  };
};

const TradingPage = async ({ params }: TradingPageProps) => {
  const { tradingId } = params;

  const tradingPromise = getTrading(tradingId);
  const commentsPromise = getComments(tradingId);

  const [trading, paginatedComments] = await Promise.all([
    tradingPromise,
    commentsPromise,
  ]);

  if (!trading) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: '매매 기록들', href: homePath() },
          { title: trading.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-from-top">
        <TradingItem
          trading={trading}
          isDetail
          attachments={
            <Attachments
              entityId={trading.id}
              entity="TRADING"
              isOwner={trading.isOwner}
            />
          }
          referencedTradings={<ReferencedTradings tradingId={trading.id} />}
          comments={
            <Comments
              tradingId={trading.id}
              paginatedComments={paginatedComments}
            />
          }
        />
      </div>
    </div>
  );
};

export default TradingPage;
