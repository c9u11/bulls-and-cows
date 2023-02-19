import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"
import { Outlet } from 'react-router-dom'
import { HeaderMain } from "./HeaderMain"
import { SettingButton } from "./SettingButton"
import { StatisticsButton } from "./StatisticsButton"

const Container = styled.header`
  position: relative;
  top: 0%;
  width: 100%;
  z-index: 555;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => props.theme.boxBgColor};
  over-flow: visible;
  height: var(--header-height);
  &>* {
    margin: 0% 1rem;
    padding: 0rem;
  }
`

const Body = styled.div`
  display: flex;
  position: relative;
  min-height: calc(100vh - var(--header-height));
  margin: 0% auto;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
`

const BlankIcon = styled.div`
  width: 2rem;
  height: 2rem;
`

export const BaseLayout = () => {
  return (
    <>
      <Container>
        <ThemeChanger></ThemeChanger>
        <BlankIcon></BlankIcon>
        <HeaderMain></HeaderMain>
        <StatisticsButton></StatisticsButton>
        <SettingButton></SettingButton>
      </Container>
      <Body>
        <Outlet></Outlet>
      </Body>
    </>
  )
}