import type { AgeRating } from "@/constants";
import type { Image, ImageError } from "@/types";
import { toast } from "sonner";

const API_ENDPOINT = "/api/proxy";

type ImageSearchParams = {
  offset: number;
  limit: number;
  ratings: readonly AgeRating[];
};

function createSearchParams(params: ImageSearchParams): URLSearchParams {
  const { ratings, ...rest } = params;
  const searchParams = new URLSearchParams();

  Object.entries(rest).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  searchParams.append("rating", ratings.join(","));
  return searchParams;
}

function isError(data: unknown): data is ImageError {
  return typeof data === "object" && data !== null && "error" in data;
}

export async function getImages(params: ImageSearchParams): Promise<Image[]> {
  try {
    const searchParams = createSearchParams(params);
    const response = await fetch(`${API_ENDPOINT}?${searchParams.toString()}`);
    const data = await response.json();

    if (isError(data)) {
      throw new Error(data.error);
    }

    return data as Image[];
  } catch (error) {
    console.error("[Image Service] Error:", error);
    toast.error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
    throw error;
  }
}
