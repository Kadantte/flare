import { type AgeRating, ERROR_MESSAGES } from "@/constants";
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

    if (data && typeof data === "object" && "error" in data) {
      throw new Error(data.error);
    }

    return data as Image[];
  } catch (error) {
    console.error("[Image Service] Error fetching images:", error);

    const message =
      error instanceof Error &&
      (Object.values(ERROR_MESSAGES) as string[]).includes(error.message)
        ? error.message
        : ERROR_MESSAGES.UNEXPECTED_ERROR;

    toast.error(message);

    throw error;
  }
}
