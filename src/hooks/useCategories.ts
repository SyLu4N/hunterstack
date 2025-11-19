import { Category } from '@/@types/Category';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

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
      const response = await getCategories(page);
      return response;
    },
  });
}
