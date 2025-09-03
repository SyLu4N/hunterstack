import { Policies } from '@/components/Policies';
import { Search } from '@/components/Search';
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
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Search />

      <Policies props={{ page }} />
    </HydrationBoundary>
  );
}
