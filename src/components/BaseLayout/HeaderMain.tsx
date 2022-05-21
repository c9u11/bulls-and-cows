import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const Center = styled.div`
display: flex;
flex:1;
align-items: center;
justify-content: center;
flex-direction: column;
color : ${props => props.theme.textColor};
`
const Title = styled.h1`
font-weight: bold;
font-size: 36px;
`
const SubTitle = styled(motion.button)`
color: inherit;
background-color: unset;
border: none;
cursor: pointer;
font-size: 18px;
display: flex;
align-items: center;
justify-content: center;
`
const MenuIcon = styled(motion.span)`
background-color: unset;
border: none;
font-size: inherit;
cursor: pointer;
padding: 0px 5px;
`

const MenuBar = styled(motion.div)`
position: absolute;
bottom: 0px;
transform: translate(0, 100%);
display: flex;
width: 100%;
background-color: ${props => props.theme.boxBgColor + "ee"};
flex-direction: column;
align-items: center;
overflow: hidden;
a {
  margin: 10px 0px;
  color: ${props => props.theme.borderColor};
  text-decoration: none;
}
a:hover {
  color: ${props => props.theme.accentColor};
}
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

const menuList = ["Home", "Challenge", "Practice", "Custom"];

export const HeaderMain = () => {
  const [showing, setShowing] = useState(false);
  const pathName = useLocation().pathname;
  let subTitle = pathName[1].toUpperCase() + pathName.slice(2);
  const toggleShowing = () => { setShowing(prev => !prev) }
  return (
    <Center>
      <Title>Bulls and Cows</Title>
      <SubTitle whileHover="hover" onClick={toggleShowing}>
        <MenuIcon variants={{ hover: { scale: 1.3 } }}>&equiv;</MenuIcon>
        {` ${subTitle}`}
      </SubTitle>
      <AnimatePresence>
        {
          showing ?
            <MenuBar
              {...menuBarVariants}
            >
              {
                menuList.map(v => {
                  return subTitle !== v ? <Link key={v} to={`/${v}`} onClick={toggleShowing}>{v}</Link> : null
                })
              }
            </MenuBar>
            : null
        }
      </AnimatePresence>
    </Center>
  )
}