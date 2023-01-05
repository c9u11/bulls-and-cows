import { isDarkAtom } from "atom/settingAtoms";
import { useRecoilState } from "recoil";
import { getSetting, setSetting } from "util/Setting";

export function useIsDark() {
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
