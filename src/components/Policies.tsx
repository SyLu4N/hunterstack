'use client';

import { Fragment, useEffect } from 'react';

import { QueryParamsPolicies, usePolicies } from '@/hooks/usePolicies';
import Link from 'next/link';

import { EmptyPolicy } from './EmptyPolicy';
import { Pagination } from './Pagination';
import { PoliciesLoading } from './PoliciesLoading';
import { TimeAndSource } from './TimeAndSource';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Skeleton } from './ui/skeleton';

interface Props {
  props: QueryParamsPolicies;
}

export function Policies({ props }: Props) {
  const { data, isLoading, refetch } = usePolicies(props);

  const policies = data?.policies || [];
  const totalCount = data?.totalCount || 0;

  useEffect(() => {
    refetch();
  }, [props]);

  if (isLoading) {
    return <PoliciesLoading />;
  }

  return policies.length > 0 ? (
    <Fragment>
      {props.category && (
        <Breadcrumb className="my-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? (
                  <Skeleton className="w-48 h-5 bg-background-400" />
                ) : (
                  policies[0]?.category?.name
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="mb-8">
        {policies.map((policy, index) => (
          <Fragment key={policy.slug}>
            {index > 0 && (
              <div className="bg-background-400 w-full h-[1px] rounded-full my-6" />
            )}

            <Link href={`/${policy.category.slug}/${policy.slug}`}>
              <div
                className={`flex flex-col gap-2 ${!props.category && 'mt-12'}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold">
                  {policy.title}
                </h2>

                <p className="text-sm md:text-md">{policy.summary} </p>

                <TimeAndSource date={policy.createdAt} source={policy.source} />
              </div>
            </Link>
          </Fragment>
        ))}
      </div>

      {totalCount > 12 && (
        <Pagination
          totalCountOfRegister={totalCount}
          currentPage={Number(props.page || 1)}
          registerPerPage={12}
        />
      )}
    </Fragment>
  ) : (
    <EmptyPolicy />
  );
}
