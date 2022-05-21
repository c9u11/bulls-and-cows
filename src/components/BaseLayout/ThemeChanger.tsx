import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../../atom/themeAtoms";
import { ReactComponent as LightIcon } from '../../svg/light.svg';
import { ReactComponent as DarkIcon } from '../../svg/dark.svg';

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
    fill: ${props => props.theme.accentColor};
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
      {isDark ?
        <DarkIcon></DarkIcon>
        : <LightIcon></LightIcon>
      }
    </ChangeThemeBtn>
  )
}