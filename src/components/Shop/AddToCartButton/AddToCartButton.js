import React from "react";
import s from "./AddToCartButton.module.scss";
import { connect } from "react-redux";
import { setProductToCart } from "../../../redux/shopingCartReducer";

const AddToCartButton = (props) => {
  const saveProductToCart = () => {
    let flag = false,
      res,
      product = {
        slug: props.slug,
        id: props.id,
        count: 1,
      };
    if (props.products_in_cart.length) {
      res = props.products_in_cart.map((prod) => {
        if (prod.id === props.id) {
          prod.count = (prod.count || 1) + 1;
          flag = true;
        }
        return prod;
      });
      if (!flag) {
        res = [...props.products_in_cart, product];
      }
    } else res = [...props.products_in_cart, product];
    props.setProductToCart(res);
  };
  return (
    <button className={s.product_button} onClick={saveProductToCart}>
      <i className="fas fa-shopping-cart"></i>
      {props.text}
    </button>
  );
};
let mapStateToProps = (state) => {
  return {
    products_in_cart: state.shopingCart.products_in_cart,
  };
};
export default connect(mapStateToProps, {
  setProductToCart,
})(AddToCartButton);
