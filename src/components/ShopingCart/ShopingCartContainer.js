import React, { Component } from "react";
import ShopingCart from "./ShopingCart";
import { connect } from "react-redux";
import {
  requestSingleProductData,
  clearProductData,
  calculateOrderAmount,
} from "../../redux/shopingCartReducer";

class ShopingCartContainer extends Component {
  componentDidMount() {
    /*     console.log(this.props.products_in_cart); */
    this.props.products_in_cart.forEach((prod) => {
      this.props.requestSingleProductData(prod.slug, prod.id, prod.count);
    });
    this.props.calculateOrderAmount();
  }

  componentDidUpdate(prevProps) {
    /* console.log("update");
    console.log(this.props.products_in_cart);
    console.log(this.props.products_in_cart_data); */
    if (prevProps.products_in_cart_data !== this.props.products_in_cart_data) {
      this.props.calculateOrderAmount();
    }
  }
  componentWillUnmount() {
    this.props.clearProductData();
  }

  render() {
    return (
      <>
        <ShopingCart items={this.props.products_in_cart_data} />
      </>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    products_in_cart: state.shopingCart.products_in_cart,
    products_in_cart_data: state.shopingCart.products_in_cart_data,
  };
};
export default connect(mapStateToProps, {
  requestSingleProductData,
  clearProductData,
  calculateOrderAmount,
})(ShopingCartContainer);
