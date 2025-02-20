"use client";

import { Download, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-[100dvh] p-0 md:h-[800px] md:max-h-[85vh] md:w-[800px] lg:w-[900px] xl:w-[1000px]">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 flex-col">
            <div className="relative flex-1 px-6 py-4">
              <Image
                src={image.url}
                alt={`Image by ${image.artist_name || "Unknown"}`}
                className="object-contain select-none"
                fill
                priority
                sizes="100vw"
              />
            </div>

            <div className="border-t px-6 py-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="text-muted-foreground h-5 w-5" />
                    <p className="text-sm font-medium">
                      {image.artist_name || "Unknown Artist"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {image.source_url && (
                      <Link
                        href={image.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "gap-2",
                        })}
                        title="View source"
                      >
                        Source
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-not-allowed gap-2 opacity-50"
                      title="Download original image (coming soon)"
                    >
                      Download
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {image.tags && image.tags.length > 0 && (
                  <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-secondary text-secondary-foreground rounded-md px-2.5 py-1 text-sm"
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
