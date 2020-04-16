import React from "react";
import s from "./OrderForm.module.scss";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";

let OrderForm = (props) => {
  return (
    <>
      <h4>Данные для оформления заказа</h4>
      <form className={s.order_form} onSubmit={props.handleSubmit}>
        <div className={s.item_group}>
          <label htmlFor="firstName">Имя</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div className={s.item_group}>
          <label htmlFor="lastName">Фамилия</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div className={s.item_group}>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <div className={s.item_group}>
          <label htmlFor="address">Адрес</label>
          <Field name="address" component="input" type="text" />
        </div>
        <div className={s.item_group}>
          <label htmlFor="phone">Телефон</label>
          <Field name="phone" component="input" type="tel" />
        </div>
        <b>{props.order_amount}</b>
        <button type="submit">Подтвердить</button>
      </form>
    </>
  );
};
OrderForm = reduxForm({
  form: "order_form",
})(OrderForm);
export default OrderForm;
