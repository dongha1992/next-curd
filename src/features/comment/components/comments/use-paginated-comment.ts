import { PaginatedData } from '@/types/pagination';
import { CommentWithMetadata } from '@/features/comment/types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getComments } from '@/features/comment/queries/get-comments';

export const usePaginatedComments = (
  tradingId: string,
  paginatedComments: PaginatedData<CommentWithMetadata>,
) => {
  const queryKey = ['comments', tradingId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(tradingId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onCreateComment: () => queryClient.invalidateQueries({ queryKey }),
    onDeleteComment: () => queryClient.invalidateQueries({ queryKey }),
    onCreateAttachment: () => queryClient.invalidateQueries({ queryKey }),
    onDeleteAttachment: () => queryClient.invalidateQueries({ queryKey }),
  };
};
