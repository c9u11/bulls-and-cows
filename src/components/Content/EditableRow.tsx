import { motion } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../types/type";
import { Digit } from "./Digit";

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;


interface EditableRowInterface {
  digitNum: number;
  unique?: boolean;
  setResult?: React.Dispatch<React.SetStateAction<string[]>>;
}

interface digitInfoInterface {
  [key: number]: {
    value: NumString;
    status: DigitStatus;
  }
}

export const EditableRow = ({ digitNum, unique = true, setResult }: EditableRowInterface) => {
  const digitInfoObject: digitInfoInterface = {};
  for (let i = 0; i < digitNum; i++) {
    digitInfoObject[i] = {
      value: "",
      status: "init"
    }
  }
  const [digitInfo, setDigitInfo] = useState(digitInfoObject);

  const setOne = (idx: number, status: DigitStatus, value?: NumString | undefined) => {
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
        if (digitInfo[idx].value !== "")
          setOne(idx, `${status}End`);
      }, 200)
  }
  const setAll = (status: DigitStatus, value?: NumString) => {
    setDigitInfo((prev) => {
      Object.keys(prev).forEach((_, idx) => {
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
    console.log(e.key);
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
        ((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement)?.focus();
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
          ((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement)?.focus();
          setAll("init", "");
          let result = ""
          for (let i = 0; i < digitNum; i++) {
            result += digitInfo[i].value;
          }
          if (setResult !== undefined)
            setResult((prev) => [...prev, result])
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
        setOne(idx, "typed", e.key as NumString);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    (document.getElementById("editableRow")?.firstElementChild as HTMLElement)?.focus();
  }, [])
  return (
    <Wrapper id="editableRow" onKeyDown={onKeyDown}>
      {
        Object.keys(digitInfo).map((_, idx) => (
          <Digit
            key={idx}
            index={idx}
            status={digitInfo[idx].status}
            value={digitInfo[idx].value}
          />
        ))
      }
    </Wrapper>
  );
}
