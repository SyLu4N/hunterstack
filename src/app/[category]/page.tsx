import { Policies } from '@/components/Policies';
import { Search } from '@/components/Search';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getPolicies } from '@/hooks/usePolicies';
import { queryClient } from '@/services/queryClient';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { [key: string]: string | string[] | undefined };
}

export default async function Category({ searchParams, params }: Props) {
  const page = Number(searchParams.page) || 1;
  const category = String(params.category);

  const arrayKey = createValueArrayFromProps({ page: String(page), category });

  await queryClient.prefetchQuery({
    queryKey: ['policies', ...arrayKey],
    queryFn: async () => getPolicies({ page, category }),
    staleTime: STALE_TIME_24HRS_QUERY,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Search />

      <Policies props={{ page, category }} />
    </HydrationBoundary>
  );
}
