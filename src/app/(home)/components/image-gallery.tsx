"use client";

import { ImageCard } from "@/app/(home)/components/image-card";
import { ImageGallerySkeleton } from "@/app/(home)/components/image-gallery-skeleton";
import { ImageLoadError } from "@/app/(home)/components/image-load-error";
import { NoImagesFound } from "@/app/(home)/components/no-images-found";

import { useImages } from "@/hooks/use-images";

const INITIAL_PRIORITY_COUNT = 4;

export function ImageGallery() {
  const { images, error, isLoading } = useImages();

  if (error) return <ImageLoadError />;
  if (isLoading) return <ImageGallerySkeleton />;
  if (images.length === 0) return <NoImagesFound />;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((image, idx) => (
        <ImageCard
          key={image.id}
          image={image}
          priority={idx < INITIAL_PRIORITY_COUNT}
        />
      ))}
    </div>
  );
}
