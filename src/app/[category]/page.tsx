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
  params: { [key: string]: string | string[] | undefined };
}

export default async function Category({ searchParams, params }: Props) {
  const queryClient = new QueryClient();

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

      <Suspense fallback={<PoliciesLoading />}>
        <Policies props={{ page, category }} />
      </Suspense>
    </HydrationBoundary>
  );
}
