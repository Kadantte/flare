export const ageRatings = [
  "safe",
  "suggestive",
  "borderline",
  "explicit",
] as const;

export type AgeRating = (typeof ageRatings)[number];

export const SFW_RATINGS = ["safe"] as const;
export const NSFW_RATINGS = ["suggestive", "borderline", "explicit"] as const;

export type SFWRating = (typeof SFW_RATINGS)[number];
export type NSFWRating = (typeof NSFW_RATINGS)[number];

export const RATINGS_BY_MODE = {
  sfw: SFW_RATINGS,
  nsfw: NSFW_RATINGS,
  all: ageRatings,
} as const;
