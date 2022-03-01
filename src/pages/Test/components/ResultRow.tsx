import { motion } from "framer-motion";
import styled from "styled-components";
import { NumString } from "../../../types/type";
import { Digit } from "./Digit";

export interface ResultRowInterface {
  result: string;
  answer: string;
}

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const DigitWrapperVariants = {
  result: {
    transition: {
      staggerChildren: 0.5
    }
  }
}
export const ResultRow = ({ result, answer }: ResultRowInterface) => {
  return (
    <Wrapper variants={DigitWrapperVariants} animate={"result"}>
      {
        result.split("").map((v, idx) => {
          return (
            <Digit
              key={idx}
              index={idx}
              status={v === answer[idx] ? "full" : answer.indexOf(v) !== -1 ? "half" : "empty"}
              value={v as NumString}
              result={true}
            />
          )
        })
      }
    </Wrapper>
  );
}
