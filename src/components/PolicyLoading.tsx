import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './ui/breadcrumb';
import { Skeleton } from './ui/skeleton';

export function PolicyLoading() {
  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={``}>
              <Skeleton className="w-28 h-5 bg-background-400" />
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="w-48 h-5 bg-background-400" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
    </div>
  );
}
