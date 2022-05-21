import { useState } from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../../types/type";
import { Digit } from "../../../components/Content/Digit";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  /* background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238)); */
  gap: 20px;
`;
export const DigitTestPage = () => {
  const [status, setStatus] = useState<DigitStatus>("init");
  const digitArray: NumString[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <Wrapper>
      {
        digitArray.map((v, i) =>
          <Digit
            key={v}
            status={status}
            value={v}
            index={i}
          ></Digit>
        )
      }

      <select value={status} onChange={(e) => setStatus(e.target.value as DigitStatus)}>
        <option>init</option>
        <option>typed</option>
        <option>error</option>
        <option>empty</option>
        <option>half</option>
        <option>full</option>
      </select>
    </Wrapper>
  );
}