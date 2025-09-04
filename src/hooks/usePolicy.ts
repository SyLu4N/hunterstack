import { Policy } from '@/@types/Policy';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { apiServer } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

type QueryProps = {
  data: Policy | undefined;
  isLoading: boolean;
  error: boolean | null;
  refetch: () => void;
  isFetching: boolean;
};

export async function getPolicy(slug: string) {
  const api = apiServer();

  const { data } = await api.get<Policy>(`/policies/${slug}`);
  return data;
}

export function usePolicy(slug: string): QueryProps {
  return useQuery({
    queryKey: ['policy', slug],
    refetchOnWindowFocus: false,
    staleTime: STALE_TIME_24HRS_QUERY,

    queryFn: async () => {
      try {
        const response = await getPolicy(slug);

        return response;
      } catch (error: any) {
        let message = 'Algo deu errado, tente novamente mais tarde';

        if (error?.response?.data?.message && error.status === 404) {
          message = error.response.data.message;
        }

        toast.error(message, {
          position: 'top-right',
          style: {
            background: 'var(--toast-bg)',
            borderColor: 'var(--toast-border)',
            color: 'var(--toast-error)',
          },
          duration: 5000,
        });
      }
    },
  });
}
