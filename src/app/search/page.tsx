import { Policies } from '@/components/Policies';
import { Search as SearchComponent } from '@/components/Search';
import { getPolicies } from '@/hooks/usePolicies';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  searchParams: { page?: string; q: string };
}

export default async function Search({ searchParams }: Props) {
  const queryClient = new QueryClient();

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
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchComponent />

      <Policies props={props} />
    </HydrationBoundary>
  );
}
