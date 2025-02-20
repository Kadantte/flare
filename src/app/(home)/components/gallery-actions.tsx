import { RefreshImages } from "@/app/(home)/components/refresh-images";
import { SettingsDialog } from "@/components/settings-dialog";

export function GalleryActions() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-end gap-2">
        <RefreshImages />
        <SettingsDialog />
      </div>
    </div>
  );
}
