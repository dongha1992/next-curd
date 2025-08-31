import { stripe } from '@/lib/stripe/index';
import { prisma } from '@/lib/prisma';

const seed = async () => {
  const t0 = performance.now();
  console.log('Stripe Seed: Started ...');

  const prices = await stripe.prices.list();
  const products = await stripe.products.list();
  const customers = await stripe.customers.list();

  for (const price of prices.data) {
    await stripe.prices.update(price.id, {
      active: false,
    });
  }

  for (const product of products.data) {
    await stripe.products.update(product.id, {
      active: false,
    });
  }

  for (const customer of customers.data) {
    await stripe.customers.del(customer.id);
  }

  const organization = await prisma.organization.findFirstOrThrow({
    include: {
      memberships: {
        include: {
          user: true,
        },
      },
    },
  });

  const testClock = await stripe.testHelpers.testClocks.create({
    frozen_time: Math.round(new Date().getTime() / 1000),
  });

  const customer = await stripe.customers.create({
    name: organization.name,
    email: organization.memberships[0].user.email,
    test_clock: testClock.id,
  });

  await prisma.stripeCustomer.create({
    data: {
      customerId: customer.id,
      organizationId: organization.id,
    },
  });

  const productOne = await stripe.products.create({
    name: '비즈니스 플랜',
    description: '비즈니스 플랜',
    metadata: {
      allowedMembers: 999,
    },
    marketing_features: [
      {
        name: '언제나 취소 가능합니다.',
      },
      {
        name: '무제한 멤버쉽',
      },
    ],
  });

  const productTwo = await stripe.products.create({
    name: '베이직 플랜',
    description: '베이직 플랜',
    metadata: {
      allowedMembers: 3,
    },
    marketing_features: [
      {
        name: '언제나 취소 가능합니다.',
      },
      {
        name: '최대 3명까지',
      },
    ],
  });

  await stripe.prices.create({
    product: productTwo.id,
    unit_amount: 19999,
    currency: 'usd',
    recurring: {
      interval: 'year',
    },
  });

  await stripe.prices.create({
    product: productTwo.id,
    unit_amount: 1999,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
  });

  await stripe.prices.create({
    product: productOne.id,
    unit_amount: 39999,
    currency: 'usd',
    recurring: {
      interval: 'year',
    },
  });

  await stripe.prices.create({
    product: productOne.id,
    unit_amount: 3999,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
  });

  const t1 = performance.now();
  console.log(`Stripe Seed: Finished (${t1 - t0}ms)`);
};

seed();
