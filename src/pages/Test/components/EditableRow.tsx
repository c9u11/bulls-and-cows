import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Digit } from "./Digit";

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


export interface EditableRowInterface {
  digitNum: number;
  unique?: boolean;
}

interface digitInfoInterface {
  [key: string]: {
    value: string;
    status: string;
  }
}

export const EditableRow = ({ digitNum, unique = true }: EditableRowInterface) => {
  const digitInfoObject: digitInfoInterface = {};
  for (let i = 0; i < digitNum; i++) {
    digitInfoObject[i] = {
      value: "",
      status: "init"
    }
  }
  const [digitInfo, setDigitInfo] = useState(digitInfoObject);

  const setOne = (idx: number, status: string, value?: string | undefined) => {
    setDigitInfo((prev) => {
      return {
        ...prev, [idx]: {
          status,
          value: value === undefined ? prev[idx].value : value,
        }
      };
    })
    if (status === "typed" || status === "error")
      setTimeout(() => {
        setOne(idx, status + "End");
      }, 200)
  }
  const setAll = (status: string, value?: string) => {
    setDigitInfo((prev) => {
      Object.keys(prev).forEach(idx => {
        prev[idx] = {
          status,
          value: value === undefined ? prev[idx].value : value
        }
      })
      return { ...prev };
    })
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let idx = Number((e.target as HTMLInputElement).getAttribute("data-index"));
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
        setOne(idx, "init", "");
        break;
      case "Escape":
        ((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement).focus();
        setAll("init", "");
        break;
      case "Enter":
        const errorPoint = [];
        for (let i = 0; i < digitNum; i++) {
          if (!digitInfo[i].value) errorPoint.push(i);
        }
        if (errorPoint.length) {
          errorPoint.forEach(v => {
            setOne(v, "error")
          })
        }
        else {
          ((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement).focus();
          setAll("init", "");
        }
        break;
      case String(Number(e.key)):
        if (unique) {
          let isUnique = true;
          for (let i = 0; i < digitNum; i++) {
            if (idx !== i && digitInfo[i].value === e.key) {
              isUnique = false;
              break;
            }
          }
          if (!isUnique) {
            setOne(idx, "error", "");
            break;
          }
        }
        ((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement)?.focus();
        setOne(idx, "typed", e.key);
        break;
      default:
        break;
    }
  }
  return (
    <Wrapper onKeyDown={onKeyDown}>
      {
        Object.keys(digitInfo).map((v) => (
          <Digit
            key={v}
            index={v}
            status={digitInfo[v].status}
            value={digitInfo[v].value}
            disabled={false}
          />
        ))
      }
    </Wrapper>
  );
}
