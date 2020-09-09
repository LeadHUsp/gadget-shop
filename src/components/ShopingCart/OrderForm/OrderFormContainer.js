import React from "react";
import { connect } from "react-redux";
import OrderForm from "./OrderForm";
import { calculateOrderAmount, postOrder } from "../../../redux/shopingCartReducer";

let OrderFormContainer = (props) => {
  const onSubmit = (formData) => {
    formData.products = props.products_in_cart;
    console.log(formData);
    props.postOrder(formData);
  };
  return (
    <>
      <OrderForm order_amount={props.order_amount} onSubmit={onSubmit} />
    </>
  );
};

const mapStateToProps = (state) => ({
  order_amount: state.shopingCart.order_amount,
  products_in_cart: state.shopingCart.products_in_cart,
});

export default connect(mapStateToProps, { calculateOrderAmount, postOrder })(
  OrderFormContainer
);
