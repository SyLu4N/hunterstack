import { Policy } from '@/@types/Policy';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { api } from '@/services/api';
import { createValueArrayFromProps } from '@/utils/createValueArrayFromProps';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type GetPolicesResponse = {
  totalCount: number;
  policies: Policy[];
};

export type QueryParamsPolicies = {
  page?: number;
  title?: string;
  category?: string;
  search?: string;
  slug?: string;
  orderByCreated?: 'asc' | 'desc';
};

export async function getPolicies(props: QueryParamsPolicies) {
  const { page, category, title, slug, orderByCreated, search } = props;

  const params: Record<string, string | number> = {};
  if (page) params.page = page;
  if (category) params.category = category;
  if (title) params.title = title;
  if (slug) params.slug = slug;
  if (search) params.search = search;
  if (orderByCreated) params.orderByCreated = orderByCreated;

  const response = await api.get<GetPolicesResponse>('/policies', { params });
  return response.data;
}

export function usePolicies(
  props: QueryParamsPolicies,
  configs?: Omit<
    UseQueryOptions<
      GetPolicesResponse | undefined,
      unknown,
      GetPolicesResponse,
      string[]
    >,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<GetPolicesResponse, unknown> {
  const arrayKey = createValueArrayFromProps({
    ...props,
    page: String(props.page),
  });

  return useQuery({
    queryKey: ['policies', ...arrayKey],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: STALE_TIME_24HRS_QUERY,

    queryFn: async () => {
      const response = await getPolicies(props);
      return response;
    },

    ...configs,
  });
}
