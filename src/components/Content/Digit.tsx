import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../types/type";

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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: var(--digit-border-radius);
  box-shadow: var(--digit-box-shadow);
  outline: none;
  border: #fff var(--digit-border-width) solid;
  text-align: center;
  font-size: var(--digit-font-size);
  font-weight: bolder;
  color: black;
  scale: 1;
  rotateY: 0;
  rotateZ: 0;
  caret-color: transparent;
`;

const digitVariants: DigitVariantsInterface = {
  init: {
  },
  focus: {
    backgroundColor: ["rgba(255, 255, 255, 0.8)", "#ddd"],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as "reverse",
      repeatDelay: 0,
      duration: 1,
    }
  },
  typed: {
    scale: [1, 1.13, 1],
    borderColor: "#777",
    transition: {
      type: "spring",
      duration: 0.2,
      bounce: 0.5
    }
  },
  typedEnd: {
    scale: 1,
    borderColor: "#777"
  },
  error: {
    rotateZ: [0, -3, 0, 3, 0, -3, 0, 3, 0],
    borderColor: "#ed695e",
    transition: {
      duration: 0.2,
      bounce: 1
    }
  },
  errorEnd: {
    rotateZ: 0,
    borderColor: "#ed695e"
  },
  empty: {
    backgroundColor: ["rgab(255,255,255,0.8)", "#ccc"],
    borderColor: ["#777", "#777"],
    rotateY: [0, 90, 0],
    transition: {
      duration: 1,
      times: [0.4, 0.5],
      rotateY: { times: [0, 0.5, 1] }
    }
  },
  half: {
    backgroundColor: ["rgba(255,255,255,0.8)", "#edd8ad"],
    borderColor: ["#777", "#f3bf4e"],
    rotateY: [0, 90, 0],
    transition: {
      duration: 1,
      times: [0.4, 0.5],
      rotateY: { times: [0, 0.5, 1] }
    }
  },
  full: {
    backgroundColor: ["rgba(255, 255, 255, 0.8)", "#a4d69c"],
    borderColor: ["#777", "#62c554"],
    rotateY: [0, 90, 0],
    transition: {
      duration: 1,
      times: [0.4, 0.5],
      rotateY: { times: [0, 0.5, 1] }
    }
  }
};

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