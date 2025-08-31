'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';
import { Form } from '@/components/form/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { createCredential } from '@/features/credential/actions/create-credential';

type CredentialCreateButtonProps = {
  organizationId: string;
};

const CredentialCreateButton = ({
  organizationId,
}: CredentialCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const [actionState, action] = useActionState(
    createCredential.bind(null, organizationId),
    EMPTY_ACTION_STATE,
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LucidePlus className="w-4 h-4" />
          보안 생성
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>보안 생성하기</DialogTitle>
          <DialogDescription>그룹의 보안을 생성하자.</DialogDescription>
        </DialogHeader>
        <Form
          action={action}
          actionState={actionState}
          onSuccess={handleClose}
          toastOptions={{
            duration: Infinity,
            closeButton: true,
          }}
        >
          <div className="grid gap-4 py-4">
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  이름
                </Label>
                <Input name="name" id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <div className="col-span-3">
                  <FieldError actionState={actionState} name="name" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <SubmitButton label="생성" />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CredentialCreateButton };
