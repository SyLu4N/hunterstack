import { Skeleton } from './ui/skeleton';

export function PoliciesLoading() {
  const fakePolices = new Array(4).fill('-');

  return (
    <div className="mt-12">
      {fakePolices.map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          {index > 0 && (
            <div className="bg-background-400 w-full h-[1px] rounded-full my-6" />
          )}

          <Skeleton className="h-10 w-8/12 bg-background-400" />

          <Skeleton className="h-28 w-full bg-background-400" />

          <div className="flex gap-2">
            <Skeleton className="h-5 w-32 bg-background-400" />

            <Skeleton className="h-5 w-36 bg-background-400" />
          </div>
        </div>
      ))}
    </div>
  );
}
