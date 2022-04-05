import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalAtom } from "../../atom/modalAtom";
import { isDarkAtom } from "../../atom/themeAtoms";

const SettingBtn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  img {
    width:80%;
  }
`;

export const SettingButton = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setModal = useSetRecoilState(modalAtom);
  return (
    <SettingBtn onClick={() => { setModal("setting") }}
    >
      {isDark ?
        <img src="/img/gear_night.png" alt="Setting"></img>
        : <img src="/img/gear_sun.png" alt="Setting"></img>
      }
    </SettingBtn>
  )
}