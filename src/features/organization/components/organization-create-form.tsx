'use client';

import Form from 'next/form';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { createOrganization } from '@/features/organization/actions/create-organization';

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );
  return <Form action={action} actionState={actionState}></Form>;
};

export { OrganizationCreateForm };
