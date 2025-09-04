import { Suspense } from 'react';

import { Policies } from '@/components/Policies';
import { PoliciesLoading } from '@/components/PoliciesLoading';
import { Search } from '@/components/Search';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getPolicies } from '@/hooks/usePolicies';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const queryClient = new QueryClient();
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

      <Suspense fallback={<PoliciesLoading />}>
        <Policies props={{ page }} />
      </Suspense>
    </HydrationBoundary>
  );
}
