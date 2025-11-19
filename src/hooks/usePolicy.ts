import { Policy } from '@/@types/Policy';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

type QueryProps = {
  data: Policy | undefined;
  isLoading: boolean;
  error: boolean | null;
  refetch: () => void;
  isFetching: boolean;
};

export async function getPolicy(slug: string) {
  const { data } = await api.get<Policy>(`/policies/${slug}`);
  return data;
}

export function usePolicy(slug: string): QueryProps {
  return useQuery({
    queryKey: ['policy', slug],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: STALE_TIME_24HRS_QUERY,

    queryFn: async () => {
      const response = await getPolicy(slug);
      return response;
    },
  });
}
