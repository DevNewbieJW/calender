export const getToday = () => {
  return new Date().toDateString().split(" ");
};

export const getDayInMonth = (month, day) => {
  return new Date(2022, month - 1, day).toDateString().split(" ");
};

export const getDaysInMonth = (month) => {
  return new Date(2022, month, 0).getDate();
};

export const getMonthOfYear = (month) => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, month, 1).toDateString().split(" ")[1];
};

export const daysInMonthToArray = (days, month) => {
  let array = [];

  for (let i = 1; i <= days; i++) {
    array.push({
      weekday: getDayInMonth(month, i)[0],
      month: getDayInMonth(month, i)[1],
      date: getDayInMonth(month, i)[2],
      year: getDayInMonth(month, i)[3],
    });
  }

  return array;
};

export const monthsInYearToArray = () => {
  let array = [];
  for (let j = 1; j <= 12; j++) {
    const daysInMonth = getDaysInMonth(j);
    const data = daysInMonthToArray(daysInMonth, j);
    array.push(data);
  }
  return array;
};
