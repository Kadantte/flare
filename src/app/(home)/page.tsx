import { Metadata } from "next";

import { GalleryActions } from "@/app/(home)/components/gallery-actions";
import { ImageGallery } from "@/app/(home)/components/image-gallery";

export const metadata: Metadata = {
  title: "Explore Anime Artwork",
};

export default function Home() {
  return (
    <div className="grid px-4 py-5 sm:px-6 lg:px-10">
      <GalleryActions />
      <ImageGallery />
    </div>
  );
}
