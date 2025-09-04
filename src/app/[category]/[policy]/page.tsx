import { Suspense } from 'react';

import { Policy } from '@/components/Policy';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getPolicy } from '@/hooks/usePolicy';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: {
    policy: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const policy = await getPolicy(params.policy);

  if (!policy) return {};

  const previousKeywords = (await parent).keywords || [];

  return {
    title: 'Hunterstack.io | ' + policy.title,
    description: policy.summary,

    keywords: [policy.title, ...policy.title.split(' '), ...previousKeywords],

    openGraph: {
      title: policy.title,
      description: policy.summary,
      siteName: 'Hunterstack.io',
    },

    creator: 'Luan Simões',
    applicationName: 'Hunterstack.io',
  };
}

export default async function Category({ params }: Props) {
  const queryClient = new QueryClient();

  const policy = String(params.policy);

  await queryClient.prefetchQuery({
    queryKey: ['policy', policy],
    queryFn: async () => getPolicy(policy),
    staleTime: STALE_TIME_24HRS_QUERY,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Policy slug={policy} />
      </Suspense>
    </HydrationBoundary>
  );
}
