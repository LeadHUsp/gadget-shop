export const required = (value) => {
  if (value) return undefined;
  return "Поле не заполнено";
};
export const email = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Не правильно указана email"
    : undefined;
};
export const phoneNumber = (value) => {
  return value && !/^\+[0-9]{12}/.test(value)
    ? "Неверно указан номер телефона"
    : undefined;
};
export const maxLength = (maxLength) => (value) => {
  if (value && value.length > maxLength)
    return `Максимальное кол-во знаков ${maxLength}`;
  return undefined;
};

export const minLength = (minLength) => (value) => {
  if (value && value.lenght < minLength)
    return `Min lenght is ${minLength} symbols`;
  return undefined;
};
