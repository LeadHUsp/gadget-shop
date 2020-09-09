import React from "react";
import s from "./OrderForm.module.scss";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { Input } from "../../includes/FormsControls/FormsControls";
/* import { createFields } from "../../includes/FormsControls/FormsControls"; */
import { required, email, maxLength, phoneNumber } from "../../utils/validators";

let OrderForm = (props) => {
  const maxLength13 = maxLength(13);
  return (
    <>
      <h4>Данные для оформления заказа</h4>
      <form className={s.order_form} onSubmit={props.handleSubmit}>
        <div className={s.item_group}>
          <label htmlFor='firstName'>Имя</label>
          <Field name='firstName' component={Input} type='text' validate={[required]} />
          <span>(Введите имя получателя товара)</span>
        </div>
        <div className={s.item_group}>
          <label htmlFor='lastName'>Фамилия</label>
          <Field name='lastName' component={Input} type='text' validate={[required]} />
          <span>(Введите фамилию получателя товара)</span>
        </div>
        <div className={s.item_group}>
          <label htmlFor='email'>Email</label>
          <Field
            name='email'
            component={Input}
            type='email'
            validate={[required, email]}
          />
          <span>
            (Укажите адрес электронной почты на которую придет подтверждение заказа)
          </span>
        </div>
        <div className={s.item_group}>
          <label htmlFor='address'>Адрес</label>
          <Field name='adress' component={Input} type='text' validate={[required]} />
          <span>
            (Укажите адрес доставки. Пример: г. Киев, ул. Столичная, дом 35, квартира 56 )
          </span>
        </div>
        <div className={s.item_group}>
          <label htmlFor='phone'>Телефон</label>
          <Field
            name='phone'
            component={Input}
            placeholder='+380998881111'
            type='tel'
            validate={[required, maxLength13, phoneNumber]}
          />
          <span>(Укажите номер телефона на который придет подтверждение заказа)</span>
        </div>
        <div className={s.item_group}>
          <div className={s.oreder_price}>
            Общая сумма заказа: {props.order_amount} грн
          </div>
        </div>
        <button type='submit' className={s.btn_submit}>
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
