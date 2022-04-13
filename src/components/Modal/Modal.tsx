import styled from "styled-components"
import { modalAtom } from '../../atom/modalAtom';
import { useRecoilState } from "recoil";
import { Test } from "./Test";
import { Setting } from "./Setting";

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
  color: ${props => props.theme.boxTextColor};
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
  color: ${props => props.theme.boxTextColor};
  font-weight: bolder;
  line-height: 24px;
  font-size: 24px;
  cursor: pointer;
  padding: 0px;
`

const returnModal = (modal: string) => {
  switch (modal) {
    case "test": return <Test />
    case "setting": return <Setting />
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
          <Background>
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