export const dateTranslater = (date) => {
  let result = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return result;
};
