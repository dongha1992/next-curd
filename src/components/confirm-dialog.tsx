import {
  cloneElement,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ActionState, EMPTY_ACTION_STATE } from './form/utils/to-action-state';
import { Button } from './ui/button';
import { useActionFeedback } from './form/hooks/use-action-feedback';

type UseConfirmDialogArgs = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement | ((isLoading: boolean) => React.ReactElement);
  onSuccess?: (actionState: ActionState) => void;
};

const useConfirmDialog = ({
  title = '정말 삭제하시겠습니까?',
  description = '삭제 후 되돌릴 수 없습니다.',
  action,
  trigger,
  onSuccess,
}: UseConfirmDialogArgs) => {
  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  const dialogTrigger = cloneElement(
    typeof trigger === 'function' ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((state) => !state),
    },
  );
  const toastRef = useRef<string | number | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  //TODO: 없을 때 테스트
  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading('삭제중 ...');
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
