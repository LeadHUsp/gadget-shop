export const required = (value) => {
  if (value) return undefined;
  return "Field is required";
};

export const maxLength = (maxLength) => (value) => {
  if (value && value.length > maxLength)
    return `Max lenght is ${maxLength} symbols`;
  return undefined;
};

export const minLength = (minLength) => (value) => {
  if (value && value.lenght < minLength)
    return `Min lenght is ${minLength} symbols`;
  return undefined;
};
