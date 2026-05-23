const DateFormat = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};
export default DateFormat;

export const DateOnlyFormat = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
