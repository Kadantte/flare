import { settingsAtom } from "@/store/settings";
import { AppSettings } from "@/types/settings";
import { useAtom } from "jotai";

export function useSettings() {
  const [settings, setSettings] = useAtom(settingsAtom);

  return {
    ...settings,
    updateSettings: (newSettings: Partial<AppSettings>) =>
      setSettings((current) => ({
        ...current,
        ...newSettings,
      })),
  };
}
