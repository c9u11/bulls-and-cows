import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../../atom/themeAtoms";

const ChangeThemeBtn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  color : ${props => props.theme.boxTextColor};
  border: none;
  img {
    width:80%;
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
        alt={isDark ? "" : ""}>
      </img> */}
      {isDark ?
        <img src="/img/night.png" alt="Set Light Mode"></img>
        : <img src="/img/sun.png" alt="Set Dark Mode"></img>
      }
    </ChangeThemeBtn>
  )
}