'use client';

import Form from 'next/form';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { createOrganization } from '@/features/organization/actions/create-organization';
import { Input } from '@/components/ui/input';
import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="name"
        placeholder="이름"
        defaultValue={actionState.payload?.get('name') as string}
      />
      <FieldError actionState={actionState} name="name" />

      <SubmitButton label="생성" />
    </Form>
  );
};

export { OrganizationCreateForm };
