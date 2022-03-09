import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"
import { Outlet } from 'react-router-dom'
import { HeaderMain } from "./HeaderMain"

const Container = styled.header`
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.boxBgColor};
  over-flow: visible;
  padding: 10px;
  height: 50px;
`
const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 10px;
  height: 50px;
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
  return (
    <>
      <Container>
        <ThemeChanger></ThemeChanger>
        <HeaderMain></HeaderMain>
        <SettingButton>Setting</SettingButton>
      </Container>
      <Body>
        <Outlet></Outlet>
      </Body>
    </>
  )
}