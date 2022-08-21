import React from "react";
import styled, { keyframes } from "styled-components";
import { DigitStatus, NumString } from "types/type";

interface DigitInterface {
  value: NumString;
  status: DigitStatus;
  index: number;
  result?: boolean;
}

const keyframesList = {
  bounce: keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.13);
    }
    100% {
      transform: scale(1);
    }
  `,
  focus: (initBgColor: string, focusBgColor: string) => keyframes`
    from {
      background-color: ${initBgColor};
    }
    to {
      background-color: ${focusBgColor};
    }
  `,
  vibrate: keyframes`
    0% {
      transform: rotateZ(0deg);
    }
    33% {
      transform: rotateZ(-3deg);
    }
    66% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(3deg);
    }
  `,
  flipY: (typedBorderColor: string, typedBgColor: string, flipedBorderColor: string, flipedBgColor: string) => keyframes`
    0% {
      background-color: ${typedBgColor};
      border-color: ${typedBorderColor};
      transform: rotateY(0deg);
    }
    50% {
      background-color: ${typedBgColor};
      border-color: ${typedBorderColor};
      transform: rotateY(90deg);
    }
    51% {
      background-color: ${flipedBorderColor};
      border-color: ${flipedBgColor};
      transform: rotateY(90deg);
    }
    100% {
      background-color: ${flipedBorderColor};
      border-color: ${flipedBgColor};
      transform: rotateY(0deg);
    }
  `
}

const DigitEl = styled.input<{ delay: number }>`
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
  caret-color: transparent;
  &.typed{
    border-color: ${props => props.theme.typedBorderColor};
    animation: ${keyframesList.bounce} 0.2s 0s 1 linear alternate;
  }
  &.error{
    border-color: ${props => props.theme.errorBorderColor};
    animation: ${keyframesList.vibrate} 0.2s 0s 2 linear alternate;
  }
  &:focus{
    animation: ${props => keyframesList.focus(props.theme.initBgColor, props.theme.focusBgColor)} 0.5s 0s infinite linear alternate;
  }
  &.typed:focus{
    border-color: ${props => props.theme.typedBorderColor};
    animation: ${keyframesList.bounce} 0.2s 0s 1 linear alternate, ${props => keyframesList.focus(props.theme.initBgColor, props.theme.focusBgColor)} 0.5s 0s infinite linear alternate;
  }
  &.error:focus{
    animation: ${keyframesList.vibrate} 0.2s 0s 2 linear alternate, ${props => keyframesList.focus(props.theme.initBgColor, props.theme.focusBgColor)} 0.5s 0s infinite linear alternate;
  }
  &.empty{
    border-color: ${props => props.theme.typedBorderColor};
    animation: ${props => keyframesList.flipY(props.theme.typedBorderColor, props.theme.initBgColor, props.theme.emptyBorderColor, props.theme.emptyBgColor)} 0.7s ${props => `${props.delay}s`} 1 linear alternate forwards;
  }
  &.half{
    border-color: ${props => props.theme.typedBorderColor};
    animation: ${props => keyframesList.flipY(props.theme.typedBorderColor, props.theme.initBgColor, props.theme.halfBorderColor, props.theme.halfBgColor)} 0.7s ${props => `${props.delay}s`} 1 linear alternate forwards;
  }
  &.full{
    border-color: ${props => props.theme.typedBorderColor};
    animation: ${props => keyframesList.flipY(props.theme.typedBorderColor, props.theme.initBgColor, props.theme.fullBorderColor, props.theme.fullBgColor)} 0.7s ${props => `${props.delay}s`} 1 linear alternate forwards;
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
      delay={index * 0.6}
      autoComplete="off"
      autoFocus
    ></DigitEl>
  )
})