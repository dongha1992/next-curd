import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    email: 'hello@gmail.com',
  },
];

const tradings = [
  {
    title: 'test1',
    content: 'First test from DB.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'test 2',
    content: 'Second test from DB.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'test 3',
    content: 'Third test from DB.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
];

const comments = [
  { content: 'First comment from DB.' },
  { content: 'Second comment from DB.' },
  { content: 'Third comment from DB.' },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started ...');

  await prisma.comment.deleteMany();
  await prisma.trading.deleteMany();
  await prisma.user.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();

  const dbOrganization = await prisma.organization.create({
    data: {
      name: 'organization 1',
    },
  });

  const passwordHash = await hash('sha256');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });
  const dbOrganization = await prisma.membership.create({
    data: {
      userId: dbUsers[0].id,
      organizationId: dbOrganization.id,
      role: 'ADMIN',
    },
  });

  const dbTradings = await prisma.trading.createManyAndReturn({
    data: tradings.map((trading) => ({
      ...trading,
      userId: dbUsers[0].id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      tradingId: dbTradings[0].id,
      userId: dbUsers[1].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
