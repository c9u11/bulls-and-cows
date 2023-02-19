import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { ROUTES_PATH_CHALLENGE, ROUTES_PATH_CUSTOM, ROUTES_PATH_HOME, ROUTES_PATH_PRACTICE } from '../../constants/Routes';

const Center = styled.div`
display: flex;
flex:1;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.h1`
font-weight: bold;
font-size: 36px;
color : ${props => props.theme.textColor};
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
color : ${props => props.theme.textColor};
`
const MenuIcon = styled(motion.span)`
background-color: unset;
border: none;
font-size: inherit;
cursor: pointer;
padding: 0px 5px;
color : ${props => props.theme.textColor};
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

const menuList = [
  {
    text: "Home",
    path: ROUTES_PATH_HOME
  },
  {
    text: "Challenge",
    path: ROUTES_PATH_CHALLENGE
  },
  {
    text: "Practice",
    path: ROUTES_PATH_PRACTICE
  },
  {
    text: "Custom",
    path: ROUTES_PATH_CUSTOM
  }
];

export const HeaderMain = () => {
  const [showing, setShowing] = useState(false);
  const pathName = useLocation().pathname;
  const subTitle = pathName[1].toUpperCase() + pathName.slice(2);
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
                menuList.map(info => {
                  return pathName !== info.path ? <Link key={info.text} to={info.path} onClick={toggleShowing}>{info.text}</Link> : null
                })
              }
            </MenuBar>
            : null
        }
      </AnimatePresence>
    </Center>
  )
}