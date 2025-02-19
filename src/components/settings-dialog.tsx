"use client";

import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <label
                htmlFor="show-nsfw"
                className="text-sm leading-none font-medium"
              >
                Show NSFW Content
              </label>
              <p className="text-muted-foreground text-[0.8rem]">
                Toggle visibility of NSFW images
              </p>
            </div>
            <Switch
              id="show-nsfw"
              checked={settings.showNSFW}
              onCheckedChange={(checked) => {
                updateSettings({ showNSFW: checked });
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
