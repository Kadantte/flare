"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useImages } from "@/hooks/use-images";
import { cn } from "@/lib/utils";

export function RefreshImages() {
  const { refetch, isFetching, isUnavailable } = useImages();

  const isDisabled = isFetching || isUnavailable;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => refetch()}
      disabled={isDisabled}
      title="Refresh Images"
    >
      <RefreshCw
        className={cn("h-4 w-4 transition-all", isFetching && "animate-spin")}
      />
    </Button>
  );
}
