'use client';

import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { createCheckoutSession } from '@/features/stripe/actions/cerate-checkout-seesion';
import { createCustomerPortal } from '@/features/stripe/actions/create-customer-portal';

type CheckoutSessionFormProps = {
  organizationId: string | null | undefined;
  priceId: string;
  activePriceId: string | null | undefined;
  children: React.ReactNode;
};

const CheckoutSessionForm = ({
  organizationId,
  priceId,
  activePriceId,
  children,
}: CheckoutSessionFormProps) => {
  const [actionState, action] = useActionState(
    !activePriceId
      ? createCheckoutSession.bind(null, organizationId, priceId)
      : createCustomerPortal.bind(null, organizationId),
    EMPTY_ACTION_STATE,
  );

  const isActivePrice = activePriceId === priceId;

  return (
    <Form action={action} actionState={actionState}>
      <Button
        type="submit"
        disabled={isActivePrice}
        className={clsx('flex flex-col', {
          'h-16': !!activePriceId,
        })}
      >
        {!activePriceId ? null : isActivePrice ? (
          <span>현재 플랜</span>
        ) : (
          <span>플랜 변경</span>
        )}
        <div>{children}</div>
      </Button>
    </Form>
  );
};

export { CheckoutSessionForm };
