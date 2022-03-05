export const randomNum = (digitNum: number, unique: boolean) => {
  const ouputArray: number[] = [];
  function makeNum() {
    if (ouputArray.length < digitNum) {
      let n = Math.floor(Math.random() * 10);
      if (!unique || notSame(n)) {
        ouputArray.push(n);
      }
      makeNum();
    }
    function notSame(n: number) {
      return ouputArray.every((e) => n !== e);
    }
  }
  makeNum();
  return ouputArray.join("");
}