"use client";

import { Settings } from "lucide-react";

import { SettingItem } from "@/components/setting-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useImages } from "@/hooks/use-images";
import { useSettings } from "@/hooks/use-settings";

export function SettingsDialog() {
  const { isUnavailable } = useImages();
  const { settings, updateSettings } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Settings"
          className="shrink-0"
          title="Settings"
          disabled={isUnavailable}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <SettingItem
            id="showNSFW"
            label="Show NSFW Content"
            description="Include NSFW images in the results"
            checked={settings.showNSFW}
            onCheckedChange={(checked) => updateSettings({ showNSFW: checked })}
          />

          <SettingItem
            id="onlyNSFW"
            label="Only NSFW Content"
            description="Show only NSFW images (requires NSFW content to be enabled)"
            checked={settings.onlyNSFW}
            disabled={!settings.showNSFW}
            onCheckedChange={(checked) => updateSettings({ onlyNSFW: checked })}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
