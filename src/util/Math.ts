import { dateToYYYYMMDD } from "./Date";

var seedrandom = require("seedrandom");
export const randomNum = (
  digitNum: number,
  unique: boolean,
  seed?: boolean
) => {
  let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let seedNum = seedrandom(
    seed ? dateToYYYYMMDD(new Date()) : new Date().getTime()
  );
  let output = "";
  for (let i = 0; i < digitNum; i++) {
    const order = Math.floor(seedNum() * nums.length);
    output += nums[order];
    if (unique) nums.splice(order, 1);
  }
  return output;
};

export const toFixedNumber = (number: number, digits: number) => {
  const numberString = number.toFixed(digits);
  return +numberString;
};
