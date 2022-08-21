import { dateToYYYYMMDD } from "./Date";

var seedrandom = require("seedrandom");
export const randomNum = (digitNum: number, unique: boolean) => {
  let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let seed = seedrandom(dateToYYYYMMDD(new Date()));
  let output = "";
  for (let i = 0; i < digitNum; i++) {
    const order = Math.floor(seed() * nums.length);
    output += nums[order];
    if (unique) nums.splice(order, 1);
  }
  return output;
};
