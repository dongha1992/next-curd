'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';

import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { passwordForgot } from '../actions/password-forgot';
import { SubmitButton } from '@/components/form/submit-button';

const PasswordForgotForm = () => {
  const [actionState, action] = useActionState(
    passwordForgot,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get('email') as string}
      />
      <FieldError actionState={actionState} name="email" />

      <SubmitButton label="이메일 보내기" />
    </Form>
  );
};

export { PasswordForgotForm };
