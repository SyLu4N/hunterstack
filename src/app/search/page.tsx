import { Policies } from '@/components/Policies';
import { Search as SearchComponent } from '@/components/Search';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getPolicies } from '@/hooks/usePolicies';
import { queryClient } from '@/services/queryClient';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
  searchParams: { page?: string; q: string };
}

export default async function Search({ searchParams }: Props) {
  const props = {
    search: searchParams.q,
    page: Number(searchParams.page) || 1,
  };

  const arrayKey = createValueArrayFromProps({
    ...props,
    page: String(props.page),
  });

  await queryClient.prefetchQuery({
    queryKey: ['policies', ...arrayKey],
    queryFn: async () => getPolicies(props),
    staleTime: STALE_TIME_24HRS_QUERY,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchComponent q={searchParams.q} />

      <Policies props={props} />
    </HydrationBoundary>
  );
}
