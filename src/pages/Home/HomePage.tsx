import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { modalAtom } from '../../atom/modalAtom';

const Container = styled.div`
`

const ModalBtn = styled.button`
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  right: 50px;
  background-color: ${props => props.theme.boxTextColor}33;
  color: ${props => props.theme.boxTextColor};
  border-radius: 50%;
  border: ${props => props.theme.boxTextColor}11 3px solid;
  width: 50px;
  height: 50px;
`

export const HomePage = () => {

  const setModal = useSetRecoilState(modalAtom);
  return (
    <Container>
      <span>tes123t</span>
      <ModalBtn onClick={() => { setModal("test") }}>?</ModalBtn>
    </Container>
  )
}