import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"

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
const SubTitle = styled.h2`
  color : ${props => props.theme.boxTextColor};
`

const MenuBar = styled(motion.div)`
  position: absolute;
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: column;
  align-items: center;
`

export const BaseLayout = () => {
  const [showing, setShowing] = useState(false);

  return (
    <>
      <Container>
        <ThemeChanger></ThemeChanger>
        <Center>
          <Title>Bulls and Cows</Title>
          <SubTitle onClick={() => { setShowing(prev => !prev) }}>Home</SubTitle>
        </Center>
        <div>Setting</div>
      </Container>
      {
        showing ?
          <MenuBar>
            <span>Home</span>
            <span>Challenge</span>
            <span>Practice</span>
            <span>Custom</span>
          </MenuBar>
          : null
      }
    </>
  )
}