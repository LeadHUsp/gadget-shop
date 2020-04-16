import React from "react";
import { NavLink } from "react-router-dom";
import NavContainer from "../Navigation/NavContainer";
import { connect } from "react-redux";
import s from "./Header.module.scss";
const Header = (props) => {
  return (
    <header className="container-fluid d-flex py-3">
      <div className="col-7">
        <NavContainer />
      </div>
      <div className="col-3 d-flex justify-content-center align-items-center">
        <span>SEARCH</span>
        <i className="fas fa-search"></i>
      </div>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <NavLink exact to="/shoping_cart">
          <div className={s.index}>
            <i className="fas fa-shopping-bag"></i>Корзина
            <span>{props.products_in_cart.length}</span>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
let mapStateToProps = (state) => {
  return {
    products_in_cart: state.shopingCart.products_in_cart,
  };
};
export default connect(mapStateToProps, {})(Header);
