import { Category } from '@/@types/Category';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { apiServer } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

type GetCategoriesResponse = {
  categories: Category[];
  totalCount: number;
};

type QueryProps = {
  data: GetCategoriesResponse | undefined;
  isLoading: boolean;
  error: boolean | null;
  refetch: () => void;
  isFetching: boolean;
};

export async function getCategories(page = 1) {
  const api = apiServer();

  const { data } = await api.get(`/categories?page=${page}`);
  return data;
}

export function useCategories(page = 1): QueryProps {
  return useQuery({
    queryKey: ['categories', String(page)],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: STALE_TIME_24HRS_QUERY,

    queryFn: async () => {
      try {
        const response = await getCategories(page);

        return response;
      } catch {
        const message = 'Algo deu errado, tente novamente mais tarde';

        toast.error(message, {
          position: 'top-right',
          style: {
            background: 'var(--toast-bg)',
            borderColor: 'var(--toast-border)',
            color: 'var(--toast-error)',
          },
          duration: 5000,
        });

        return { categories: [], totalCount: 0 };
      }
    },
  });
}
