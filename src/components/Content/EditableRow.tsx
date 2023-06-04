import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { DigitStatus, NumString } from "types/type";
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

export let focusChange: Function;
export let action: Function;

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
  focusChange = (idx: number) => {
    setTimeout(() => (document.getElementById("editableRow")?.children[idx] as HTMLElement)?.focus(), 0)
  }
  action = (cmd: String) => {
    let focusEl = document.getElementById("focusEl");
    if (!focusEl) {
      let focus = 0;
      for (let i = 0; i < digitNum; i++) {
        if (digitInfo[i].status === "typed") focus = i;
      }
      focusChange(focus);
      return;
    }
    let idx = Number(focusEl?.getAttribute("data-index"));
    const preValue = (focusEl as HTMLInputElement)?.value;
    switch (cmd) {
      case "ArrowLeft":
        focusChange(idx - 1);
        break;
      case "ArrowRight":
        focusChange(idx + 1);
        break;
      case "Backspace":
        if (idx !== 0 && !preValue) {
          idx--;
        }
        setOne(idx, "init", "");
        focusChange(idx);
        break;
      case "Escape":
        setAll("init", "");
        focusChange(0);
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
          focusChange(errorPoint[0]);
        }
        else {
          focusChange(0);
          let result = ""
          for (let i = 0; i < digitNum; i++) { result += digitInfo[i].value; }
          if (setResult !== undefined) setResult((prev) => [...prev, result]);
          setAll("init", "");
          focusChange(0);
        }
        break;
      case String(Number(cmd)):
        if (unique) {
          let isUnique = true;
          for (let i = 0; i < digitNum; i++) {
            if (idx !== i && digitInfo[i].value === cmd) {
              isUnique = false;
              break;
            }
          }
          if (!isUnique) {
            setOne(idx, "error", "");
            break;
          }
        }
        setOne(idx, "typed", cmd as NumString);
        focusChange(idx + 1);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    focusChange(0);
  }, [])

  return (
    <>
      <Wrapper id="editableRow" onKeyDown={(e) => { action(e.key) }}>
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
    </>
  );
}
