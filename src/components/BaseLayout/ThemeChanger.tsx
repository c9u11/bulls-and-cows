import styled from "styled-components";
import { ReactComponent as LightIcon } from 'svg/light.svg';
import { ReactComponent as DarkIcon } from 'svg/dark.svg';
import { useIsDark } from "hooks/useSetting";

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
  const { isDark, toggleDarkAtom } = useIsDark();

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