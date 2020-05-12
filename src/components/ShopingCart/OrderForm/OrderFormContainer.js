import React from "react";
import { connect } from "react-redux";
import OrderForm from "./OrderForm";
import { calculateOrderAmount } from "../../../redux/shopingCartReducer";

let OrderFormContainer = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <>
      <OrderForm order_amount={props.order_amount} onSubmit={onSubmit} />
    </>
  );
};

const mapStateToProps = (state) => ({
  order_amount: state.shopingCart.order_amount,
});

export default connect(mapStateToProps, { calculateOrderAmount })(
  OrderFormContainer
);
