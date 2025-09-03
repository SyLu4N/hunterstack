'use client';

import { Fragment } from 'react';

import NotFound from '@/app/not-found';
import { usePolicy } from '@/hooks/usePolicy';

import { ButtonPolicyExport } from './ButtonPolicyExport';
import { ButtonPolicyFavorite } from './ButtonPolicyFavorite';
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
  slug: string;
}

export function Policy({ slug }: Props) {
  const { data: policy, isLoading, error } = usePolicy(slug);

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/${policy?.category?.slug}`}>
              {isLoading ? (
                <Skeleton className="w-28 h-5 bg-background-400" />
              ) : (
                policy?.category?.name
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {isLoading ? (
                <Skeleton className="w-48 h-5 bg-background-400" />
              ) : (
                policy?.title
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-1/2 h-10 bg-background-400" />

          <div className="flex gap-2">
            <Skeleton className="h-5 w-32 bg-background-400" />

            <Skeleton className="h-5 w-36 bg-background-400" />
          </div>

          <Skeleton className="h-32 w-full bg-background-400 my-3" />

          <Skeleton className="h-32 w-full bg-background-400 my-3" />

          <Skeleton className="h-32 w-full bg-background-400 my-3" />
        </div>
      ) : (
        <Fragment>
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {policy?.title}
              </h2>

              <TimeAndSource
                date={policy?.createdAt || new Date()}
                source={policy?.source || ''}
              />
            </div>

            <div className="flex flex-col gap-1">
              <ButtonPolicyFavorite policy={policy} />

              <ButtonPolicyExport policy={policy} />
            </div>
          </div>

          {policy?.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="my-6 text-justify">
              {paragraph}
            </p>
          ))}
        </Fragment>
      )}
    </div>
  );
}
