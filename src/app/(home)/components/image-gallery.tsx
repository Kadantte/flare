"use client";

import { useInView } from "react-intersection-observer";

import { ImageCard } from "@/app/(home)/components/image-card";
import { ImageGallerySkeleton } from "@/app/(home)/components/image-gallery-skeleton";
import { ImageLoadError } from "@/app/(home)/components/image-load-error";
import { NoImagesFound } from "@/app/(home)/components/no-images-found";
import { NoNSFWImages } from "@/app/(home)/components/no-nsfw-images";

import { NSFW_RATINGS, type NSFWRating } from "@/constants";
import { useImages } from "@/hooks/use-images";
import { useSettings } from "@/hooks/use-settings";

const THRESHOLD = 0.5;
const INITIAL_PRIORITY_COUNT = 4;

export function ImageGallery() {
  const { ref, inView } = useInView({
    threshold: THRESHOLD,
    rootMargin: "100px",
  });

  const { settings } = useSettings();
  const {
    images,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useImages();

  if (error) return <ImageLoadError />;
  if (isLoading) return <ImageGallerySkeleton />;

  const filteredImages = settings.showNSFW
    ? images
    : images.filter(
        (image) => !NSFW_RATINGS.includes(image.rating as NSFWRating)
      );

  if (filteredImages.length === 0) {
    if (images.length > 0 && !settings.showNSFW) {
      return <NoNSFWImages />;
    }
    return <NoImagesFound />;
  }

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredImages.map((image, idx) => (
          <ImageCard
            key={image.id}
            image={image}
            priority={idx < INITIAL_PRIORITY_COUNT}
          />
        ))}
      </div>

      {isFetchingNextPage && <ImageGallerySkeleton />}

      <div ref={ref} className="h-20" aria-hidden="true" />
    </div>
  );
}
