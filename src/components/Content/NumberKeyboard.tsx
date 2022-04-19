import styled from "styled-components"

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
`

const Key = styled("button")`
  border-radius: 4px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ClickKey = () => {
  const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
  console.log(event);
  console.log(document.getElementById("editableRow"));
  document.getElementById("editableRow")?.dispatchEvent(event);
}
export const NumberKeyboard = () => {
  return (
    <Row>
      <Key id="test" onKeyDown={(e) => { console.log(e); }} onClick={ClickKey}>0</Key>
      <Key>1</Key>
      <Key>2</Key>
      <Key>3</Key>
      <Key>4</Key>
      <Key>5</Key>
      <Key>6</Key>
      <Key>7</Key>
      <Key>8</Key>
      <Key>9</Key>
    </Row>
  )
}