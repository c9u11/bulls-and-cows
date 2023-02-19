import { useEffect, useRef } from "react"
import styled from "styled-components"

import { action } from "components/Content/EditableRow";
const Keyboard = styled.div`
  display: grid;
  width: calc(100% - 2rem);
  margin: 0rem 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 4rem);
  grid-gap: 0.5rem 0.3rem;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${props => props.theme.borderColor};
  border-radius: 1rem;
`

const Key = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.boxBgColor};
  border-radius: .5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  svg path{
    fill: ${props => props.theme.textColor};
  }
  &.row2 {
    z-index:1;
  }
  &:hover,
  &:focus {
    transform: translateY(2px);
  }
  &:active {
    transform: translateY(4px); 
  }
`

export const NumberKeyboard = () => {
  const keyboard = useRef<HTMLInputElement>(null);
  useEffect(() => {
    Array.from(keyboard.current?.children || []).forEach((el) => {
      el.addEventListener("click", (e) => {
        const value = (e.currentTarget as HTMLElement).getAttribute("data-value");
        action(value);
      });
    });
  }, []);
  return (
    <Keyboard ref={keyboard}>
      <Key className="row1" data-value={1}>1</Key>
      <Key className="row1" data-value={2}>2</Key>
      <Key className="row1" data-value={3}>3</Key>
      <Key className="row1" data-value={4}>4</Key>
      <Key className="row1" data-value={5}>5</Key>
      <Key className="row1" data-value={"Backspace"}>
        <svg height="24" viewBox="0 0 24 24" width="24">
          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      </Key>
      <Key className="row2" data-value={6}>6</Key>
      <Key className="row2" data-value={7}>7</Key>
      <Key className="row2" data-value={8}>8</Key>
      <Key className="row2" data-value={9}>9</Key>
      <Key className="row2" data-value={0}>0</Key>
      <Key className="row2" data-value={"Enter"}>
        <svg height="24" viewBox="0 0 24 24" width="24">
          <path d="M21,4 C21.5128358,4 21.9355072,4.38604019 21.9932723,4.88337887 L22,5 L22,11.5 C22,13.3685634 20.5357224,14.8951264 18.6920352,14.9948211 L18.5,15 L5.415,15 L8.70710678,18.2928932 C9.06759074,18.6533772 9.09532028,19.2206082 8.79029539,19.6128994 L8.70710678,19.7071068 C8.34662282,20.0675907 7.77939176,20.0953203 7.38710056,19.7902954 L7.29289322,19.7071068 L2.29289322,14.7071068 C2.25749917,14.6717127 2.22531295,14.6343256 2.19633458,14.5953066 L2.12467117,14.4840621 L2.12467117,14.4840621 L2.07122549,14.371336 L2.07122549,14.371336 L2.03584514,14.265993 L2.03584514,14.265993 L2.0110178,14.1484669 L2.0110178,14.1484669 L2.00397748,14.0898018 L2.00397748,14.0898018 L2,14 L2.00278786,13.9247615 L2.00278786,13.9247615 L2.02024007,13.7992742 L2.02024007,13.7992742 L2.04973809,13.6878575 L2.04973809,13.6878575 L2.09367336,13.5767785 L2.09367336,13.5767785 L2.14599545,13.4792912 L2.14599545,13.4792912 L2.20970461,13.3871006 L2.20970461,13.3871006 L2.29289322,13.2928932 L2.29289322,13.2928932 L7.29289322,8.29289322 C7.68341751,7.90236893 8.31658249,7.90236893 8.70710678,8.29289322 C9.06759074,8.65337718 9.09532028,9.22060824 8.79029539,9.61289944 L8.70710678,9.70710678 L5.415,13 L18.5,13 C19.2796961,13 19.9204487,12.4051119 19.9931334,11.64446 L20,11.5 L20,5 C20,4.44771525 20.4477153,4 21,4 Z"></path>
        </svg>
      </Key>
    </Keyboard >
  )
}