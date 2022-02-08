import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Digit } from "../components/Digit";

const Wrapper = styled(motion.div)`
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
export const RowTestPage = () => {
  const [digitInfo, setDigitInfo] = useState(new Array(4).fill(["", "initial"]))

  const setOne = (idx: number, status: string, value: string) => {
    setDigitInfo(prev => {
      prev[idx] = [value, status]
      return [...prev];
    })
  }
  const setAll = (status: string, value?: string) => {
    setDigitInfo(prev => {
      return [...prev.map(v => [value || v[0], status])];
    })
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    // console.log(e.key);
    const preValue = (e.target as HTMLInputElement)?.value;
    switch (e.key) {
      case "ArrowLeft":
        ((e.target as HTMLInputElement)?.previousElementSibling as HTMLElement)?.focus();
        break;
      case "ArrowRight":
        ((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement)?.focus();
        break;
      case "Backspace":
        if (!preValue) {
          ((e.target as HTMLInputElement)?.previousElementSibling as HTMLElement)?.focus();
          idx--;
        }
        setOne(idx, "initial", "");
        break;
      case "Escape":
        ((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement).focus();
        setAll("initial");
        break;
      case "Enter":

        break;
      case String(Number(e.key)):
        ((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement)?.focus();
        setOne(idx, "typed", e.key);
        break;
      default:
        break;
    }
  }

  return (
    <Wrapper>
      {
        digitInfo.map((v, i) => (
          <Digit
            key={i}
            status={v[1]}
            value={v[0]}
            onKeyDown={(e) => { onKeyDown(e, i) }}
          />
        ))
      }
    </Wrapper>
  );
}
