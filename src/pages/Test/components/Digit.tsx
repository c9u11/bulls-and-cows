import { motion } from "framer-motion";
import styled from "styled-components";

export interface DigitInterface {
  value: number;
  status: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export const Digit = ({ value, status, onChange }: DigitInterface) => {
  const Digit = styled(motion.input)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 130px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    outline: none;
    border: #777 3px solid;
    text-align: center;
    font-size: 64px;
    font-weight: bolder;
    color: black;
    scale: 1;
    rotateY: 0;
    rotateZ: 0;
  `;
  const digitVariants = {
    initial: {
      color: "transparent",
      borderColor: "white"
    },
    typed: {
      scale: [1, 1.13, 1],
      borderColor: "#777",
      transition: {
        type: "spring",
        duration: 0.2,
        bounce: 0.5
      }
    },
    error: {
      rotateZ: [0, -3, 0, 3, 0, -3, 0, 3, 0],
      borderColor: "#ed695e",
      transition: {
        duration: 0.2,
        bounce: 1
      }
    },
    empty: {
      backgroundColor: "#ccc",
      borderColor: "#777",
      rotateY: [0, 90, 0],
      transition: {
        duration: 0,
        delay: 0.5,
        rotateY: {
          duration: 1,
          delay: 0
        }
      }
    },
    half: {
      backgroundColor: "#edd8ad",
      borderColor: "#f3bf4e",
      rotateY: [0, 90, 0],
      transition: {
        duration: 0,
        delay: 0.5,
        rotateY: {
          duration: 1,
          delay: 0
        }
      }
    },
    full: {
      backgroundColor: "#a4d69c",
      borderColor: "#62c554",
      rotateY: [0, 90, 0],
      transition: {
        duration: 0,
        delay: 0.5,
        rotateY: {
          duration: 1,
          delay: 0
        }
      }
    }
  };
  return (
    <Digit
      value={value}
      disabled={!onChange}
      onChange={!!onChange ? onChange : () => { }}
      maxLength={1}
      variants={digitVariants}
      animate={status}
    ></Digit>
  )
}