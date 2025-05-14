"use client";

import { useQuery } from "@tanstack/react-query";

import { RATINGS_BY_MODE } from "@/constants";
import { useSettings } from "@/hooks/use-settings";
import { getImages } from "@/services/image-service";

export function useImages() {
  const { showNSFW, onlyNSFW } = useSettings();

  const mode = !showNSFW ? "sfw" : onlyNSFW ? "nsfw" : "all";

  const { data, isError, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["images", mode],
    queryFn: () => getImages(RATINGS_BY_MODE[mode]),
  });

  return {
    images: data ?? [],
    isError,
    isLoading,
    isFetching,
    error,
    isUnavailable: isError || isLoading,
    refetch,
  };
}
