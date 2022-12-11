const dateFormat = (input) => {
  return input < 10 ? "0" + input : input;
};

const toStartOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

const dateToInputFormat = (date) => {
  if (!date) {
    return null;
  }

  const month = dateFormat(date.getMonth() + 1);
  const day = dateFormat(date.getDate());
  const hours = dateFormat(date.getHours());
  const minutes = dateFormat(date.getMinutes());

  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
};

export { toStartOfDay, dateToInputFormat };
