import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { modalAtom } from '../../atom/modalAtom';

const Container = styled.div`
`

export const HomePage = () => {

  const setModal = useSetRecoilState(modalAtom);
  return (
    <Container>
      <span>tes123t</span>
      <button onClick={() => { setModal("test") }}>show modal</button>
    </Container>
  )
}