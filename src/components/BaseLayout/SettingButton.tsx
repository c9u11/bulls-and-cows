import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalAtom } from "atom/modalAtom";
import { ReactComponent as SettingIcon } from "svg/gear.svg";
import { SETTING_PATH } from "constants/ModalRoute";

const SettingBtn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  svg {
    width: 35px;
    height: 35px;
    path {
      fill: ${props => props.theme.accentColor};
    }
  }
`;

export const SettingButton = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <SettingBtn onClick={() => { setModal(SETTING_PATH) }}
    >
      <SettingIcon></SettingIcon>
    </SettingBtn>
  )
}