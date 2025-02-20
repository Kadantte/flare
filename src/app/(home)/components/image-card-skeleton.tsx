import { Skeleton } from "@/components/ui/skeleton";

export function ImageCardSkeleton() {
  return (
    <div aria-hidden="true" className="rounded-xl shadow-md">
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
