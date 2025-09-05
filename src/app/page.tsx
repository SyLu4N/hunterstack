import { Policies } from '@/components/Policies';
import { Search } from '@/components/Search';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getPolicies } from '@/hooks/usePolicies';
import { queryClient } from '@/services/queryClient';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const arrayKey = createValueArrayFromProps({ page: String(page) });

  await queryClient.prefetchQuery({
    queryKey: ['policies', ...arrayKey],
    queryFn: async () => getPolicies({ page }),
    staleTime: STALE_TIME_24HRS_QUERY,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Search />

      <Policies props={{ page }} />
    </HydrationBoundary>
  );
}
