'use client';

import NotFound from '@/app/not-found';
import { usePolicy } from '@/hooks/usePolicy';

import { ButtonPolicyExport } from './ButtonPolicyExport';
import { ButtonPolicyFavorite } from './ButtonPolicyFavorite';
import { PolicyLoading } from './PolicyLoading';
import { TimeAndSource } from './TimeAndSource';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

interface Props {
  slug: string;
}

export function Policy({ slug }: Props) {
  const { data: policy, isLoading, error } = usePolicy(slug);

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <PolicyLoading />;
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
              {policy?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{policy?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
    </div>
  );
}
