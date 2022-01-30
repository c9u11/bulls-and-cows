import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../../atom/themeAtoms";

const ChangeThemeBtn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  img {
    width:100%;
  }
`;

export const ThemeChanger = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  return (
    <ChangeThemeBtn
      onClick={toggleDarkAtom}
    >
      {/* <img
        src={isDark ? "" : ""}
        alt="Change Theme Botton">
      </img> */}
      <span>
        {isDark ? "Dark" : "Light"}
      </span>
    </ChangeThemeBtn>
  )
}