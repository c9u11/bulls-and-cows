import { isDarkAtom } from "atom/themeAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useTheme() {
  const [isDark, setDark] = useRecoilState(isDarkAtom);

  const toggleDarkAtom = () => {
    setDark((prev) => !prev);
  };
  return { isDark, toggleDarkAtom };
}
