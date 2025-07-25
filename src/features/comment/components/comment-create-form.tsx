'use client';

import { Form } from '@/components/form/form';
import { Textarea } from '@/components/ui/textarea';
import { FieldError } from '@/components/form/field-error';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { createComment } from '../actions/create-comment';
import { SubmitButton } from '@/components/submit-button';

type CommentCreateFormProps = {
  tradingId: string;
  onCreateComment?: () => void;
};

const CommentCreateForm = ({
  tradingId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, tradingId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = () => {
    onCreateComment?.();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="매매에 대한 생각을 적어주세요." />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label="Comment" />
    </Form>
  );
};
export { CommentCreateForm };
