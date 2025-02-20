"use client";

import { useQuery } from "@tanstack/react-query";

import { RATINGS_BY_MODE, type Mode } from "@/constants";
import { useSettings } from "@/hooks/use-settings";
import { getImages } from "@/services/image-service";

const ITEMS_PER_PAGE = 30;

function getModeFromSettings(showNSFW: boolean, onlyNSFW: boolean): Mode {
  if (!showNSFW) return "sfw";
  return onlyNSFW ? "nsfw" : "all";
}

export function useImages() {
  const { settings } = useSettings();
  const mode = getModeFromSettings(settings.showNSFW, settings.onlyNSFW);

  const { data, isError, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["images", mode],
    queryFn: () =>
      getImages({
        offset: 0,
        limit: ITEMS_PER_PAGE,
        ratings: RATINGS_BY_MODE[mode],
      }),
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
