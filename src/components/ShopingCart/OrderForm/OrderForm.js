import React from "react";
import s from "./OrderForm.module.scss";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
/* import { createFields } from "../../includes/FormsControls/FormsControls";
import { required, minLength } from "../../utils/validators"; */

let OrderForm = (props) => {
  return (
    <>
      <h4>Данные для оформления заказа</h4>
      <form className={s.order_form} onSubmit={props.handleSubmit}>
        <div className={s.item_group}>
          <label htmlFor="firstName">Имя</label>
          {/* {createFields(
            null,
            "firstName",
            [requiredField, minLength10],
            "input"
          )} */}
          <Field name="firstName" component="input" type="text" />
          <span>(Введите имя получателя товара)</span>
        </div>
        <div className={s.item_group}>
          <label htmlFor="lastName">Фамилия</label>
          <Field name="lastName" component="input" type="text" />
          <span>(Введите фамилию получателя товара)</span>
        </div>
        <div className={s.item_group}>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
          <span>
            (Укажите адрес электронной почты на которую придет подтверждение
            заказа)
          </span>
        </div>
        <div className={s.item_group}>
          <label htmlFor="address">Адрес</label>
          <Field name="address" component="input" type="text" />
          <span>
            (Укажите адрес доставки. Пример: г. Киев, ул. Столичная, дом 35,
            квартира 56 )
          </span>
        </div>
        <div className={s.item_group}>
          <label htmlFor="phone">Телефон</label>
          <Field name="phone" component="input" type="tel" />
          <span>
            (Укажите номер телефона на который придет подтверждение заказа)
          </span>
        </div>
        <div className={s.item_group}>
          <div className={s.oreder_price}>
            Общая сумма заказа: {props.order_amount} грн
          </div>
        </div>
        <button type="submit" className={s.btn_submit}>
          Подтвердить
        </button>
      </form>
    </>
  );
};
OrderForm = reduxForm({
  form: "order_form",
})(OrderForm);
export default OrderForm;
