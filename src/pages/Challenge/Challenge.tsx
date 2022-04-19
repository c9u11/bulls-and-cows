import { useState } from "react";
import styled from "styled-components"
import { EditableRow } from "../../components/Content/EditableRow";
import { NumberKeyboard } from "../../components/Content/NumberKeyboard";
import { ResultRow } from "../../components/Content/ResultRow";
import { randomNum } from "../../util";

const Container = styled.div`
  display:flex;
  flex-direction: column;
  padding: 16px 0px;
  gap: 16px;
  flex-grow: 1;
`

const digitNum = 4;
const isUnique = true;

const answer = randomNum(digitNum, isUnique);

export const Challenge = () => {
  const [result, setResult] = useState<string[]>([]);
  return (
    <Container onClick={(e) => { if ((e.target as HTMLElement).tagName !== "INPUT") document.getElementById("focusEl")?.focus() }}>
      {
        result.map((v, i) => (
          <ResultRow key={`ResultRow${i}`} result={v} answer={answer}></ResultRow>
        ))
      }
      {
        result.indexOf(answer) === -1 ? <EditableRow digitNum={digitNum} unique={isUnique} setResult={setResult}></EditableRow> : null
      }
      <NumberKeyboard></NumberKeyboard>
    </Container>
  );
}