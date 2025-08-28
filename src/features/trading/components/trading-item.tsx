'use client';

import { Button } from '@/components/ui/button';
import { tradingEditPath, tradingPath } from '@/paths';
import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { TradingMoreMenu } from './trading-more-menu';
import { clsx } from 'clsx';
import { TRADING_ICONS } from '@/features/trading/constants';
import { toCurrency } from '@/utils/currency';
import { TradingWithMetadata } from '@/features/trading/types';

type TradingItemProps = {
  trading: TradingWithMetadata;
  isDetail?: boolean;
  attachments?: React.ReactNode;
  comments?: React.ReactNode;
};

const TradingItem = ({
  trading,
  isDetail,
  comments,
  attachments,
}: TradingItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={tradingPath(trading.id)}>
        <LucideArrowUpRightFromSquare className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = trading.isOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={tradingEditPath(trading.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = trading.isOwner ? (
    <TradingMoreMenu
      trading={trading}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx('w-full flex flex-col gap-y-4', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TRADING_ICONS[trading.status]}</span>
              <span className="truncate">{trading.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx('whitespace-break-spaces', {
                'line-clamp-3': !isDetail,
              })}
            >
              {trading.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {trading.deadline} by {trading.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrency(trading.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>
      {attachments}
      {comments}
    </div>
  );
};

export { TradingItem };
