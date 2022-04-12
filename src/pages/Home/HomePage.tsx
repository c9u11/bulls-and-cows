import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { modalAtom } from '../../atom/modalAtom';
import { Fireworks } from 'fireworks-js/dist/react'

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

  const options = {
    speed: 3
  }

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#0000'
  }

  const setModal = useSetRecoilState(modalAtom);
  return (
    <Container>
      <span>tes123t</span>
      <Fireworks options={options} style={style as React.CSSProperties} />
      <ModalBtn onClick={() => { setModal("test") }}>Help</ModalBtn>
    </Container>
  )
}