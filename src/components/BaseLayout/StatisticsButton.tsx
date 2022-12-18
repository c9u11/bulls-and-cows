import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalAtom } from "atom/modalAtom";
import { ReactComponent as GraphIcon } from "svg/graph.svg";
import { RESULT_BOARD_PATH } from "constants/ModalRoute";

const StatisticsBtn = styled.button`
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

export const StatisticsButton = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <StatisticsBtn onClick={() => { setModal(RESULT_BOARD_PATH) }}
    >
      <GraphIcon></GraphIcon>
    </StatisticsBtn>
  )
}