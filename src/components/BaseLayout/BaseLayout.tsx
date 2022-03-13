import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"
import { Outlet } from 'react-router-dom'
import { HeaderMain } from "./HeaderMain"
import { modalAtom } from "../../atom/modalAtom"
import { useSetRecoilState } from "recoil"

const Container = styled.header`
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 555;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => props.theme.boxBgColor};
  over-flow: visible;
  height: 70px;
  &>* {
    margin: 0px 10px;
  }
`

const SettingButton = styled.button`
  width: 50px;
  height: 50px;
`

const Body = styled.div`
  position: relative;
  max-width: 100vw;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.primaryTextColor};
`

export const BaseLayout = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <>
      <Container>
        <ThemeChanger></ThemeChanger>
        <HeaderMain></HeaderMain>
        <SettingButton onClick={() => { setModal("setting") }}>Setting</SettingButton>
      </Container>
      <Body>
        <Outlet></Outlet>
      </Body>
    </>
  )
}