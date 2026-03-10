"use client";


import { RATINGS_BY_MODE } from "@/constants";
import { useSettings } from "@/hooks/use-settings";
import { getImages } from "@/services/image-service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useImages() {
  const { showNSFW, onlyNSFW } = useSettings();

  const mode = !showNSFW ? "sfw" : onlyNSFW ? "nsfw" : "all";

  const {
    data,
    isError,
    isLoading,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", mode],
    queryFn: ({ pageParam = 0 }) =>
      getImages(RATINGS_BY_MODE[mode], pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 30 ? allPages.length * 30 : undefined;
    },
  });

  const images = useMemo(() => {
    const allImages = data?.pages.flat() ?? [];
    const seen = new Set<number>();
    return allImages.filter((image) => {
      if (seen.has(image.id)) return false;
      seen.add(image.id);
      return true;
    });
  }, [data]);

  return {
    images,
    isError,
    isLoading,
    isFetching,
    error,
    isUnavailable: isError || isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
