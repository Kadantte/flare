"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ImageCardSkeleton } from "@/app/(home)/components/image-card-skeleton";
import { ImageDialog } from "@/app/(home)/components/image-dialog";
import { ImageError } from "@/app/(home)/components/image-error";

import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";

type ImageCardProps = {
  image: ImageType;
  priority: boolean;
};

export function ImageCard({ image, priority }: ImageCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dominantColor =
    image.color_dominant.length === 3
      ? `rgb(${image.color_dominant.join(", ")})`
      : "rgb(229, 231, 235)";

  if (hasError) return <ImageError />;

  return (
    <ImageDialog image={image}>
      <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg">
        <div
          className="relative aspect-square"
          style={{ backgroundColor: dominantColor }}
        >
          {!isImageLoaded && <ImageCardSkeleton />}

          <Image
            src={image.url}
            alt={`Image by ${image.artist_name || "Unknown"}`}
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-105",
              isImageLoaded ? "blur-0" : "opacity-0 blur-2xl"
            )}
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setHasError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>

        {isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-black/60 opacity-0 backdrop-blur-[1px] select-none group-hover:opacity-100">
            <div className="flex flex-col items-center opacity-0 group-hover:opacity-100">
              <Eye className="h-8 w-8 text-white/80" strokeWidth={1.5} />
              <p className="mt-2 text-sm font-medium text-white/80">
                Click to view
              </p>
            </div>
          </div>
        )}
      </div>
    </ImageDialog>
  );
}
