import { isDarkAtom } from "atom/themeAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getSetting, setSetting } from "util/Setting";

export function useTheme() {
  const [isDark, setDark] = useRecoilState(isDarkAtom);

  const toggleDarkAtom = () => {
    setDark((prev) => {
      const setting = getSetting();
      setting.darkMode = !prev;
      setSetting(setting);
      return !prev;
    });
  };
  return { isDark, toggleDarkAtom };
}
