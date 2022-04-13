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
  background-color: ${props => props.theme.boxBgColor};
  color: ${props => props.theme.boxTextColor};
  padding: 20px;
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
    <Background>
      {
        modal
          ? <Container>
            {returnModal(modal)}
            <button onClick={closeModal}>X</button>
          </Container>
          : null
      }
    </Background>
  )
}