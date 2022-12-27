import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "atom/themeAtoms";
import { ReactComponent as LightIcon } from 'svg/light.svg';
import { ReactComponent as DarkIcon } from 'svg/dark.svg';
import { useTheme } from "hooks/Theme";

const ChangeThemeBtn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  color : ${props => props.theme.textColor};
  border: none;
  svg {
    width: 35px;
    height: 35px;
    path {
      fill: ${props => props.theme.accentColor};
    }
  }
`;


export const ThemeChanger = () => {
  const { isDark, toggleDarkAtom } = useTheme();

  return (
    <ChangeThemeBtn
      onClick={toggleDarkAtom}
    >
      {isDark ?
        <DarkIcon></DarkIcon>
        : <LightIcon></LightIcon>
      }
    </ChangeThemeBtn>
  )
}