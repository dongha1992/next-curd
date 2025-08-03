'use client';

import { Form } from '@/components/form/form';
import { Input } from '@/components/ui/input';
import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { passwordChange } from '@/features/password/actions/password-change';

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
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

      <SubmitButton label="Send Email" />
    </Form>
  );
};

export { PasswordChangeForm };
