import type { AgeRating } from "@/constants";
import type { Image } from "@/types";
import { toast } from "sonner";

const API_ENDPOINT = "/api/proxy";

export async function getImages(
  ratings: readonly AgeRating[]
): Promise<Image[]> {
  try {
    const response = await fetch(
      `${API_ENDPOINT}?offset=0&limit=30&rating=${ratings.join(",")}`
    );

    const data = await response.json();

    return data as Image[];
  } catch (error) {
    console.error("[Image Service] Error:", error);
    toast.error("An unexpected error occurred");
    throw error;
  }
}
