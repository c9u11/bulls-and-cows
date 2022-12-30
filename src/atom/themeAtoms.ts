import { atom } from "recoil";
import { getSetting } from "util/Setting";

const { darkMode } = getSetting();

export const isDarkAtom = atom({
  key: "isDark",
  default: darkMode,
});
