import styled from "styled-components";
import { Digit } from "./Digit";

interface BlankRowInterface {
  digitNum: number;
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--default-gap);
`;

export const BlankRow = ({ digitNum }: BlankRowInterface) => {
  const array = new Array(digitNum).fill(" ");
  return (
    <Wrapper>
      {
        array.map((v, idx) => {
          return (
            <Digit
              key={idx}
              index={idx}
              status="init"
              value=""
              result={true}
            />
          )
        })
      }
    </Wrapper>
  );
}
