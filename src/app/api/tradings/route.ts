import { searchParamsCache } from '@/features/trading/search-params';
import { getTradings } from '@/features/trading/queries/get-tradings';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const untypedSearchParams = Object.fromEntries(searchParams);
  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  const { list, metadata } = await getTradings(
    undefined,
    false,
    typedSearchParams,
  );

  return Response.json({ list, metadata });
}
