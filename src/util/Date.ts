export const dateToYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}${`${date.getMonth() + 1}`.padStart(
    2,
    "0"
  )}${`${date.getDate()}`.padStart(2, "0")}`;
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
