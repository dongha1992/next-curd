'use client';

import { Trading, TradingStatus } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TRADING_STATUS_LABELS } from '@/features/trading/constants';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { LucideTrash } from 'lucide-react';
import { deleteTrading } from '../actions/delete-trading';
import { updateTradingStatus } from '../actions/update-trading-status';
import { toast } from 'sonner';

type TradingMoreMenuProps = {
  trading: Trading;
  trigger: React.ReactElement;
};

const TradingMoreMenu = async ({ trading, trigger }: TradingMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTrading.bind(null, trading.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>삭제</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTradingStatus = async (value: string) => {
    const promise = updateTradingStatus(trading.id, value as TradingStatus);

    toast.promise(promise, {
      loading: 'Updating status...',
    });

    const result = await promise;

    if (result.status === 'ERROR') {
      toast.error(result.message);
    } else if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }
  };

  const tradingStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={trading.status}
      onValueChange={handleUpdateTradingStatus}
    >
      {(Object.keys(TRADING_STATUS_LABELS) as Array<TradingStatus>).map(
        (key) => {
          return (
            <DropdownMenuRadioItem key={key} value={key}>
              {TRADING_STATUS_LABELS[key]}
            </DropdownMenuRadioItem>
          );
        },
      )}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {tradingStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TradingMoreMenu };
