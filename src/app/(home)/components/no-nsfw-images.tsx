import { AlertCircle } from "lucide-react";

export function NoNSFWImages() {
  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle className="text-muted-foreground h-12 w-12" />
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-tight">
            Content Filtered
          </p>
          <p className="text-muted-foreground mt-2">
            Enable NSFW content in the settings to view these images
          </p>
        </div>
      </div>
    </div>
  );
}
