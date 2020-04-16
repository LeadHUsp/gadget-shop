import React from "react";
import s from "../ShopingCart.module.scss";
import { connect } from "react-redux";
import { increaseProductCount } from "../../../redux/shopingCartReducer";

const IncreaseProductBtn = (props) => {
  const clickHandler = () => {
    props.increaseProductCount(props.id);
  };
  return (
    <button className={s.btn_plus} onClick={clickHandler}>
      <i className="fas fa-plus" aria-hidden="true"></i>
    </button>
  );
};

export default connect(null, {
  increaseProductCount,
})(IncreaseProductBtn);
