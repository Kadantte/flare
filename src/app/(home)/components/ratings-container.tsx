import { RatingsDropdown } from "@/app/(home)/components/ratings-dropdown";
import { SettingsDialog } from "@/components/settings-dialog";

export function RatingsContainer() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <RatingsDropdown />
        </div>

        <SettingsDialog />
      </div>
    </div>
  );
}
