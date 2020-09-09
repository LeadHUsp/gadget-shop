import React from "react";
import s from "./FormControls.module.scss";
import { Field } from "redux-form";

export const Input = ({ input, meta, ...props }) => {
  const showError = meta.touched && meta.error;
  return (
    <>
      <input className={showError ? s.form_error : ""} {...props} {...input} />
      {showError && <div className={s.error_message}>{meta.error}</div>}
    </>
  );
};

export const createFields = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => {
  return (
    <>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </>
  );
};
