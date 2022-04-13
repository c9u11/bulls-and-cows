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
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.theme.boxBgColor};
  border-radius: 50%;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 15px;
  font-weight: bolder;
`

export const HomePage = () => {

  const setModal = useSetRecoilState(modalAtom);
  return (
    <Container>
      <span>tes123t</span>
      <ModalBtn onClick={() => { setModal("test") }}>Help</ModalBtn>
    </Container>
  )
}