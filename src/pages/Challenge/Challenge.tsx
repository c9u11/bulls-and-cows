import { useState } from "react";
import styled from "styled-components"
import { EditableRow } from "../../components/Content/EditableRow";
import { ResultRow } from "../../components/Content/ResultRow";
import { randomNum } from "../../util";

const Container = styled.div`
  display:flex;
  flex-direction: column;
  padding: 16px 0px;
  gap: 16px;
`

const digitNum = 4;
const isUnique = true;

const answer = randomNum(digitNum, isUnique);

export const Challenge = () => {
  const [result, setResult] = useState<string[]>([]);
  return (
    <Container>
      {
        result.map((v, i) => (
          <ResultRow key={`ResultRow${i}`} result={v} answer={answer}></ResultRow>
        ))
      }
      {
        result.indexOf(answer) === -1 ? <EditableRow digitNum={digitNum} unique={isUnique} setResult={setResult}></EditableRow> : null
      }
    </Container>
  );
}