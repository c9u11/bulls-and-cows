import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../types/type";
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

interface DigitInterface {
  value: NumString;
  status: DigitStatus;
  index: number;
  result?: boolean;
}

type DigitVariantsInterface = { [key in DigitStatus]: {} }

const DigitEl = styled(motion.input)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--digit-width);
  height: var(--digit-height);
  background-color: ${props => props.theme.initBgColor};
  border-radius: var(--digit-border-radius);
  box-shadow: var(--digit-box-shadow);
  outline: none;
  border: ${props => props.theme.initBorderColor} var(--digit-border-width) solid;
  text-align: center;
  font-size: var(--digit-font-size);
  font-weight: bolder;
  color: ${props => props.theme.textColor};
  scale: 1;
  rotateY: 0;
  rotateZ: 0;
  caret-color: transparent;
`;

const IdleFunc = () => { }

const onFocus = () => {
  const currentEl = document.getElementById("focusEl")
  if (currentEl) currentEl.id = "";

  const el = document.activeElement as HTMLElement;
  if (el) {
    el.focus();
    el.id = "focusEl";
  }
}

export const Digit = React.memo(({ value, status, index, result }: DigitInterface) => {
  const themeContext = useContext(ThemeContext);
  const digitVariants: DigitVariantsInterface = {
    init: {
    },
    focus: {
      backgroundColor: [themeContext.initBgColor, themeContext.focusBgColor],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        repeatDelay: 0,
        duration: 1,
      }
    },
    typed: {
      scale: [1, 1.13, 1],
      borderColor: themeContext.typedBorderColor,
      transition: {
        type: "spring",
        duration: 0.2,
        bounce: 0.5
      }
    },
    typedEnd: {
      scale: 1,
      borderColor: themeContext.typedBorderColor,
    },
    error: {
      rotateZ: [0, -3, 0, 3, 0, -3, 0, 3, 0],
      borderColor: themeContext.errorBorderColor,
      transition: {
        duration: 0.2,
        bounce: 1
      }
    },
    errorEnd: {
      rotateZ: 0,
      borderColor: themeContext.errorBorderColor
    },
    empty: {
      backgroundColor: [themeContext.initBgColor, themeContext.emptyBgColor],
      borderColor: [themeContext.typedBorderColor, themeContext.emptyBorderColor],
      rotateY: [0, 90, 0],
      transition: {
        duration: 1,
        times: [0.4, 0.5],
        rotateY: { times: [0, 0.5, 1] }
      }
    },
    half: {
      backgroundColor: [themeContext.initBgColor, themeContext.halfBgColor],
      borderColor: [themeContext.typedBorderColor, themeContext.halfBorderColor],
      rotateY: [0, 90, 0],
      transition: {
        duration: 1,
        times: [0.4, 0.5],
        rotateY: { times: [0, 0.5, 1] }
      }
    },
    full: {
      backgroundColor: [themeContext.initBgColor, themeContext.fullBgColor],
      borderColor: [themeContext.typedBorderColor, themeContext.fullBorderColor],
      rotateY: [0, 90, 0],
      transition: {
        duration: 1,
        times: [0.4, 0.5],
        rotateY: { times: [0, 0.5, 1] }
      }
    }
  };
  return (
    <DigitEl
      value={value}
      disabled={!!result}
      onChange={IdleFunc}
      maxLength={1}
      variants={result ? { result: digitVariants[status] } : digitVariants}
      animate={result ? undefined : status}
      whileFocus={!!result ? undefined : "focus"}
      onFocus={onFocus}
      data-index={index}
    ></DigitEl>
  )
})