import styled from "styled-components"

const Keyboard = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 58px);
  grid-gap: 5px;
  padding: 5px;
  box-sizing: border-box;
  background-color: ${props => props.theme.borderColor};
  border-radius: 10px;
`

const Key = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  font-size: 20px;
  fill: ${props => props.theme.textColor};
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.boxBgColor};
  border-radius: 10px;
  padding: 0px;
  &:last-child {
    grid-column: 6/7;
    grid-row: 1/3;
  }
  &.row2 {
    z-index:1;
  }
  transition: box-shadow 0.3s ease, transform 0.15s ease;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover,
  &:focus {
    transform: translateY(2px);
  }
  &:active {
    transform: translateY(4px); 
  }
`

export const NumberKeyboard = () => {
  return (
    <Keyboard>
      <Key className="row1">1</Key>
      <Key className="row1">2</Key>
      <Key className="row1">3</Key>
      <Key className="row1">4</Key>
      <Key className="row1">5</Key>
      <Key className="row2">6</Key>
      <Key className="row2">7</Key>
      <Key className="row2">8</Key>
      <Key className="row2">9</Key>
      <Key className="row2">0</Key>
      <Key>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      </Key>
    </Keyboard >
  )
}