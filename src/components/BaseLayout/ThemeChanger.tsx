import styled from "styled-components";
import { ReactComponent as LightIcon } from 'svg/light.svg';
import { ReactComponent as DarkIcon } from 'svg/dark.svg';
import { useIsDark } from "hooks/useSetting";

const ChangeThemeBtn = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
  color : ${props => props.theme.textColor};
  border: none;
  svg {
    width: 100%;
    height: 100%;
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