import { getTrading } from '@/features/trading/queries/get-trading';
import { prisma } from '@/lib/prisma';
import { hashToken } from '@/utils/crypto';
import { tradingsPath } from '@/paths';
import { revalidatePath } from 'next/cache';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tradingId: string }> },
) {
  const { tradingId } = await params;
  const ticket = await getTrading(tradingId);
  return Response.json(ticket);
}

export async function DELETE(
  { headers }: Request,
  { params }: { params: Promise<{ tradingId: string }> },
) {
  const { tradingId } = await params;

  const bearerToken = new Headers(headers).get('Authorization');
  const authToken = (bearerToken || '').split('Bearer ').at(1);

  if (!authToken) {
    return Response.json({ error: 'Not authorized' }, { status: 401 });
  }

  const trading = await prisma.trading.findUnique({
    where: {
      id: tradingId,
    },
  });

  if (!trading) {
    return Response.json(
      { error: '매매 기록을 찾을 수 없습니다.' },
      { status: 404 },
    );
  }

  const hashedToken = hashToken(authToken);
  const credential = await prisma.credential.findUnique({
    where: {
      secretHash: hashedToken,
      organizationId: trading.organizationId,
    },
  });

  if (!credential) {
    return Response.json({ error: 'Not authorized' }, { status: 401 });
  }

  await prisma.$transaction([
    prisma.trading.delete({
      where: {
        id: tradingId,
      },
    }),
    prisma.credential.update({
      where: {
        id: credential.id,
      },
      data: {
        lastUsed: new Date(),
      },
    }),
  ]);

  revalidatePath(tradingsPath());

  return Response.json({ tradingId });
}
