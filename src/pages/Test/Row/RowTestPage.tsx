import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditableRow } from '../components/EditableRow';
import { ResultRow } from '../components/ResultRow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor};
  gap: 20px;
`

const answer = randomNum(4, true);

export const RowTestPage = () => {
  const [result, setResult] = useState<string[]>([]);
  return (
    <Container>
      {
        result.map((v, i) => (
          <ResultRow key={`ResultRow${i}`} result={v} answer={answer}></ResultRow>
        ))
      }
      {
        result.indexOf(answer) === -1 ? <EditableRow digitNum={4} unique={true} setResult={setResult}></EditableRow> : null
      }
    </Container>
  );
}

function randomNum(digitNum: number, unique: boolean) {
  const ouputArray: number[] = [];
  function makeNum() {
    if (ouputArray.length < digitNum) {
      let n = Math.floor(Math.random() * 10);
      if (!unique || notSame(n)) {
        ouputArray.push(n);
      }
      makeNum();
    }
    function notSame(n: number) {
      return ouputArray.every((e) => n !== e);
    }
  }
  makeNum();
  return ouputArray.join("");
}