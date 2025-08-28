import { useState } from 'react';
import { AttachmentEntity } from '@prisma/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PaperclipIcon } from 'lucide-react';
import { AttachmentCreateForm } from '@/features/attachments/components/attachment-create-form';
import { SubmitButton } from '@/components/form/submit-button';

type AttachmentCreateButtonProps = {
  entityId: string;
  entity: AttachmentEntity;
  onCreateAttachment?: () => void;
};

const AttachmentCreateButton = ({
  entityId,
  entity,
  onCreateAttachment,
}: AttachmentCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    onCreateAttachment?.();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PaperclipIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드하기</DialogTitle>
          <DialogDescription>이미지나 PDF를 업로드해주세요.</DialogDescription>
        </DialogHeader>
        <AttachmentCreateForm
          entityId={entityId}
          entity={entity}
          buttons={
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                취소
              </Button>
              <SubmitButton label="Upload" />
            </DialogFooter>
          }
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export { AttachmentCreateButton };
