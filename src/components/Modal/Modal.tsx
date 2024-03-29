import styled from "styled-components"
import { modalAtom } from 'atom/modalAtom';
import { useRecoilState } from "recoil";
import { ResultBoard } from "./ResultBoard";
import { Setting } from "./Setting";
import { HELP_PATH, RESULT_BOARD_PATH, SETTING_PATH } from "constants/ModalRoute";
import { Help } from "./Help";

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
  background: #00000088;
`
const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.boxBgColor};
  color: ${props => props.theme.textColor};
  border: ${props => props.theme.borderColor} 1px solid;
  border-radius: 10px;
  padding: 32px 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90%;
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: none;
  background-color: #00000000;
  color: ${props => props.theme.textColor};
  font-weight: bolder;
  line-height: 24px;
  font-size: 24px;
  cursor: pointer;
  padding: 0px;
`

const returnModal = (modal: string) => {
  switch (modal) {
    case RESULT_BOARD_PATH: return <ResultBoard />
    case SETTING_PATH: return <Setting />
    case HELP_PATH: return <Help />
    default: return null
  }
}
export const Modal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const closeModal = () => { setModal("") }
  return (
    <>
      {
        modal
          ?
          <Background onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
            <Container>
              {returnModal(modal)}
              <CloseButton onClick={closeModal}>&#935;</CloseButton>
            </Container>
          </Background>
          : null
      }
    </>
  )
}