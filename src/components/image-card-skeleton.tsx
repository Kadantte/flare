import { Skeleton } from "@/components/ui/skeleton";

export function ImageCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md select-none"
    >
      <div className="relative aspect-square">
        <Skeleton className="h-full w-full" />
      </div>

      <Skeleton className="absolute top-4 left-4 h-5 w-16" />

      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-neutral-950/50 to-transparent p-4">
        <div className="flex flex-wrap gap-1">
          {[...Array(2)].map((_, idx) => (
            <Skeleton key={idx} className="h-5 w-16" />
          ))}
        </div>
        <Skeleton className="mt-2 h-4 w-32" />
      </div>
    </div>
  );
}
