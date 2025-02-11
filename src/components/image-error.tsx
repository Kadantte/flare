import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function ImageError() {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md select-none">
      <div className="relative aspect-square">
        <div className="bg-muted/50 flex h-full w-full flex-col items-center justify-center gap-2 p-4">
          <ExclamationTriangleIcon className="text-muted-foreground h-8 w-8" />
          <p className="text-muted-foreground text-sm">Failed to load image</p>
        </div>
      </div>
    </div>
  );
}
