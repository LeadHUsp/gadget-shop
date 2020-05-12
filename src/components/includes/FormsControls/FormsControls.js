import React from "react";
import s from "./FormControls.module.scss";
import { Field } from "redux-form";

/* export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${style.form_control} ${hasError && style.error}`}>
      <input {...input} {...props} />

      {hasError && <span className={style.error_message}>{meta.error}</span>}
    </div>
  );
}; */

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
