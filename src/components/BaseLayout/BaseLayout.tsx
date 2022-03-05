import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"
import { Link, useLocation, Outlet } from 'react-router-dom'

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.boxBgColor};
  padding: 10px;
  height: 50px;
`
const Center = styled.div`
  flex:1;
  text-align: center;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  color : ${props => props.theme.boxTextColor};
`
const SubTitle = styled.button`
  color : ${props => props.theme.boxTextColor};
  background-color: unset;
  border: none;
`

const MenuBar = styled(motion.div)`
  position: absolute;
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  a {
    margin: 10px 0px;
  }
`

const SettingButton = styled.button`
  width: 50px;
  height: 50px;
`

const menuBarVariants = {
  initial: {
    height: "0px"
  },
  animate: {
    height: "auto"
  },
  exit: {
    height: "0px"
  }
}

export const BaseLayout = () => {
  const [showing, setShowing] = useState(false);
  let subTitle = "";
  switch (useLocation().pathname) {
    case "/": subTitle = "Home"; break;
    case "/Challenge": subTitle = "Challenge"; break;
    case "/Practice": subTitle = "Practice"; break;
    case "/Custom": subTitle = "Custom"; break;
  }
  return (
    <>
      <Container>
        <ThemeChanger></ThemeChanger>
        <Center>
          <Title>Bulls and Cows</Title>
          <SubTitle onClick={() => { setShowing(prev => !prev) }}>&equiv; {subTitle}</SubTitle>
        </Center>
        <SettingButton>Setting</SettingButton>
      </Container>
      <AnimatePresence>
        {
          showing ?
            <MenuBar
              {...menuBarVariants}
            >
              {subTitle === "Home" ? null : <Link to="/">Home</Link>}
              {subTitle === "Challenge" ? null : <Link to="/Challenge">Challenge</Link>}
              {subTitle === "Practice" ? null : <Link to="/Practice">Practice</Link>}
              {subTitle === "Custom" ? null : <Link to="/Custom">Custom</Link>}
            </MenuBar>
            : null
        }
      </AnimatePresence>
      <Outlet></Outlet>
    </>
  )
}