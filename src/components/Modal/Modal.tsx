import styled from "styled-components"
import { modalAtom } from '../../atom/modalAtom';
import { useRecoilState } from "recoil";
import { Test } from "./Test";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
  background: #00000088;
`

const returnModal = (modal: string) => {
  switch (modal) {
    case "test": return <Test />
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
          ? <Container>
            {returnModal(modal)}
            <button onClick={closeModal}>X</button>
          </Container>
          : null
      }
    </>
  )
}