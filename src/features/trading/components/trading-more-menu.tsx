import { Trading, TradingStatus } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TRADING_STATUS_LABELS } from '@/features/trading/constants';

type TradingMoreMenuProps = {
  trading: Trading;
  trigger: React.ReactElement;
};

const TradingMoreMenu = ({ trading, trigger }: TradingMoreMenuProps) => {
  const handleUpdateTradingStatus = () => {};

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
