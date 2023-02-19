import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalAtom } from "atom/modalAtom";
import { ReactComponent as GraphIcon } from "svg/graph.svg";
import { RESULT_BOARD_PATH } from "constants/ModalRoute";

const StatisticsBtn = styled.button`
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

export const StatisticsButton = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <StatisticsBtn onClick={() => { setModal(RESULT_BOARD_PATH) }}
    >
      <GraphIcon></GraphIcon>
    </StatisticsBtn>
  )
}