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

const focusElement = (el: HTMLElement) => {
  const currentEl = document.getElementById("focusEl")
  if (currentEl) currentEl.id = "";

  if (el) {
    el.focus();
    el.id = "focusEl";
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
    switch (e.key) {
      case "ArrowLeft":
        focusElement((e.target as HTMLInputElement)?.previousElementSibling as HTMLElement);
        break;
      case "ArrowRight":
        focusElement((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement);
        break;
      case "Backspace":
        if (!preValue) {
          focusElement((e.target as HTMLInputElement)?.previousElementSibling as HTMLElement);
          idx--;
        }
        setOne(idx, "init", "");
        break;
      case "Escape":
        focusElement((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement);
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
          focusElement((e.target as HTMLInputElement)?.parentElement?.firstElementChild as HTMLElement);
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
        focusElement((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement);
        setOne(idx, "typed", e.key as NumString);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    focusElement(document.getElementById("editableRow")?.firstElementChild as HTMLElement);
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
