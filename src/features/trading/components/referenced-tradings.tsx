import { LucideArrowUpRightFromSquare } from 'lucide-react';
import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { tradingPath } from '@/paths';
import { getReferencedTradings } from '../queries/get-referenced-tradings';

type ReferencedTradingsProps = {
  tradingId: string;
};

const ReferencedTradings = async ({ tradingId }: ReferencedTradingsProps) => {
  const referencedTradings = await getReferencedTradings(tradingId);

  if (!referencedTradings.length) return null;

  return (
    <CardCompact
      title="Referenced Tradings"
      description="Tradings that have been referenced in comments"
      content={
        <div className="mx-2 mb-4">
          {referencedTradings.map((referencedTrading) => (
            <div key={referencedTrading.id}>
              <Link
                className="flex gap-x-2 items-center text-sm"
                href={tradingPath(referencedTrading.id)}
              >
                <LucideArrowUpRightFromSquare className="h-4 w-4" />
                {referencedTrading.title}
              </Link>
            </div>
          ))}
        </div>
      }
    />
  );
};

export { ReferencedTradings };
