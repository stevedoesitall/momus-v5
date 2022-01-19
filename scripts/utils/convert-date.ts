const convertDate = (date: Date | string): string => {
  const dateLocaleString: string = new Date(date).toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  const dateSubstring: string = dateLocaleString.substring(
    0,
    dateLocaleString.indexOf(",")
  );

  const convertedDate: Date = new Date(dateSubstring);

  const reformatNumber = (value: number): string | number => {
    return value < 10 ? "0" + value : value;
  };

  const year: number = convertedDate.getFullYear();
  const month: number | string = reformatNumber(convertedDate.getMonth() + 1);
  const day: number | string = reformatNumber(convertedDate.getDate());

  return `${year}-${month}-${day}`;
};

export default convertDate;
