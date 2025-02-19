import { AppSettings } from "@/types/settings";
import { atomWithStorage } from "jotai/utils";

const SETTINGS_KEY = "flare-settings";

const DEFAULT_SETTINGS: AppSettings = {
  showNSFW: false,
};

export const settingsAtom = atomWithStorage(SETTINGS_KEY, DEFAULT_SETTINGS);
