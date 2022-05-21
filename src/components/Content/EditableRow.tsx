import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "../../types/type";
import { Digit } from "./Digit";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--default-gap);
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
  const editableRowRef = useRef<HTMLInputElement>(null);
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
        setTimeout(() => (editableRowRef.current?.children[idx - 1] as HTMLElement)?.focus(), 0)
        break;
      case "ArrowRight":
        setTimeout(() => (editableRowRef.current?.children[idx + 1] as HTMLElement)?.focus(), 0)
        break;
      case "Backspace":
        if (idx !== 0 && !preValue) idx--;
        setOne(idx, "init", "");
        setTimeout(() => (editableRowRef.current?.children[idx] as HTMLElement)?.focus(), 0)
        break;
      case "Escape":
        setAll("init", "");
        setTimeout(() => (editableRowRef.current?.children[0] as HTMLElement)?.focus(), 0)
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
          setAll("init", "");
          setTimeout(() => (editableRowRef.current?.children[0] as HTMLElement)?.focus(), 0)
          let result = ""
          for (let i = 0; i < digitNum; i++) { result += digitInfo[i].value; }
          if (setResult !== undefined) setResult((prev) => [...prev, result]);
          setTimeout(() => (editableRowRef.current?.children[0] as HTMLElement)?.focus(), 0)
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
        setOne(idx, "typed", e.key as NumString);
        setTimeout(() => (editableRowRef.current?.children[idx + 1] as HTMLElement)?.focus(), 0)
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    setTimeout(() => (editableRowRef.current?.children[0] as HTMLElement)?.focus(), 0)
  }, [])
  return (
    <Wrapper id="editableRow" onKeyDown={onKeyDown} ref={editableRowRef}>
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
