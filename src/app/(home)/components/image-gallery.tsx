"use client";

import { ImageCard } from "@/app/(home)/components/image-card";
import { ImageGallerySkeleton } from "@/app/(home)/components/image-gallery-skeleton";
import { ImageLoadError } from "@/app/(home)/components/image-load-error";
import { NoImagesFound } from "@/app/(home)/components/no-images-found";

import { useImages } from "@/hooks/use-images";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ImageDialog } from "@/app/(home)/components/image-dialog";

const INITIAL_PRIORITY_COUNT = 4;

export function ImageGallery() {
  const {
    images,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useImages();
  const { ref, inView } = useInView();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) return <ImageLoadError />;
  if (isLoading) return <ImageGallerySkeleton />;
  if (images.length === 0) return <NoImagesFound />;

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const selectedImage =
    selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image, idx) => (
          <ImageCard
            key={image.id}
            image={image}
            priority={idx < INITIAL_PRIORITY_COUNT}
            onClick={() => setSelectedImageIndex(idx)}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      <div ref={ref} className="h-4 w-full" />

      <ImageDialog
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImageIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedImageIndex !== null && selectedImageIndex < images.length - 1}
        hasPrev={selectedImageIndex !== null && selectedImageIndex > 0}
      />
    </>
  );
}
