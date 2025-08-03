'use client';

import { Form } from '@/components/form/form';
import { Input } from '@/components/ui/input';
import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { passwordReset } from '@/features/password/actions/password-reset';

type PasswordResetFormProps = {
  tokenId: string;
};
const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get('password') as string}
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get('confirmPassword') as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="비밀번호 초기화" />
    </Form>
  );
};
export { PasswordResetForm };
