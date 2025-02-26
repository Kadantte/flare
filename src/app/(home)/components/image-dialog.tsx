"use client";

import { Download, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Image as ImageType } from "@/types";

type ImageDialogProps = {
  image: ImageType;
  children: React.ReactNode;
};

export function ImageDialog({ image, children }: ImageDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    startTransition(async () => {
      try {
        const filename = `image_${image.id}.jpg`;

        const response = await fetch(image.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        toast.success("Image downloaded successfully");
      } catch (error) {
        console.error("Failed to download image:", error);
        toast.error("Failed to download image");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-[90dvh] w-[95vw] max-w-[95vw] overflow-hidden rounded-lg border p-0 shadow-md transition-all duration-300 sm:h-[85vh] sm:max-h-[85vh] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]">
        <div className="bg-background flex h-full flex-col">
          <DialogHeader className="flex flex-row items-center justify-between border-b px-3 py-2.5 sm:px-4 sm:py-3">
            <DialogTitle className="text-sm font-medium sm:text-base">
              Image Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={image.url}
                  alt={`Image by ${image.artist_name || "Unknown"}`}
                  className="max-h-full object-contain select-none"
                  fill
                  priority
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 60vw"
                />
              </div>
            </div>

            <div className="bg-background border-t px-3 py-3 sm:px-4 sm:py-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium sm:text-sm">
                        {image.artist_name || "Unknown Artist"}
                      </p>
                      <p className="text-muted-foreground text-[10px] sm:text-xs">
                        Artist
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center gap-2 sm:mt-0">
                    {image.source_url && (
                      <Link
                        href={image.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className:
                            "h-7 gap-1 px-2 text-xs sm:h-8 sm:gap-1.5 sm:px-3",
                        })}
                        title="View source"
                      >
                        Source
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 cursor-pointer gap-1 px-2 text-xs sm:h-8 sm:gap-1.5 sm:px-3"
                      title="Download original image"
                      onClick={handleDownload}
                      disabled={isPending}
                    >
                      {isPending ? "Downloading..." : "Download"}
                      <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Button>
                  </div>
                </div>

                {image.tags && image.tags.length > 0 && (
                  <div>
                    <h3 className="text-muted-foreground mb-1.5 text-[10px] font-medium sm:mb-2 sm:text-xs">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {image.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] sm:px-2 sm:text-xs"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
