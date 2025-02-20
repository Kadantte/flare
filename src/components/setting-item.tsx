import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { AppSettings } from "@/types";

type SettingItemProps = {
  id: keyof AppSettings;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SettingItem({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-muted-foreground text-[0.8rem]">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
