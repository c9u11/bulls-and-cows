import React from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../types/type";

interface DigitInterface {
  value: NumString;
  status: DigitStatus;
  index: number;
  result?: boolean;
}

const DigitEl = styled.input`
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
  &:active{
    background-color: ${props => props.theme.focusBgColor};
  }
  &.typed{
    border-color: ${props => props.theme.typedBorderColor};
  }
  &.error{
    border-color: ${props => props.theme.errorBorderColor};
  }
  &.empty{
    background-color: ${props => props.theme.emptyBgColor};
    border-color: ${props => props.theme.emptyBorderColor};
  }
  &.half{
    background-color: ${props => props.theme.halfBgColor};
    border-color: ${props => props.theme.halfBorderColor};
  }
  &.full{
    background-color: ${props => props.theme.fullBgColor};
    border-color: ${props => props.theme.fullBorderColor};
  }
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

const animationList = {
  bounce: {
    scale: [1, 1.13, 1],
    transition: {
      type: "spring",
      duration: 0.2,
      bounce: 0.5
    }
  },
  vibrate: {
    rotateZ: [0, -3, 0, 3, 0, -3, 0, 3, 0],
    transition: {
      duration: 0.2,
      bounce: 1
    }
  },
  flipY: {
    rotateY: [0, 90, 0],
    transition: {
      duration: 1,
      rotateY: { times: [0, 0.5, 1] }
    }
  }
}

export const Digit = React.memo(({ value, status, index, result }: DigitInterface) => {
  return (
    <DigitEl
      key={Math.random().toFixed(2)}
      className={status}
      value={value}
      disabled={!!result}
      onChange={IdleFunc}
      maxLength={1}
      onFocus={onFocus}
      data-index={index}
      autoComplete="off"
      autoFocus
    ></DigitEl>
  )
})