import { DEFAULT_STATE, LOCAL_STORAGE_KEY } from "constants/Setting";
import { SettingInterface } from "interfaces/Setting";

function initSetting(prev = DEFAULT_STATE) {
  const setting: SettingInterface = {
    ...prev,
  };
  return setSetting(setting);
}

export function getSetting() {
  let setting: SettingInterface;
  try {
    const settingString = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    setting = (settingString && JSON.parse(settingString)) || DEFAULT_STATE;
  } catch {
    setting = initSetting();
  }
  return setting;
}

export function setSetting(setting: SettingInterface) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setting));
  return setting;
}
