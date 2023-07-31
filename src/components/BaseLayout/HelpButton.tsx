import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalAtom } from "atom/modalAtom";
import { ReactComponent as HelpIcon } from "svg/question.svg";
import { HELP_PATH } from "constants/ModalRoute";

const HelpBtn = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  svg {
    width: 100%;
    height: 100%;
    path {
      fill: ${props => props.theme.accentColor};
    }
  }
`;

export const HelpButton = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <HelpBtn onClick={() => { setModal(HELP_PATH) }}
    >
      <HelpIcon></HelpIcon>
    </HelpBtn>
  )
}