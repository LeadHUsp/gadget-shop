import React from "react";
import s from "../ShopingCart.module.scss";
import { connect } from "react-redux";
import { decreaseProductCount } from "../../../redux/shopingCartReducer";

const DecreaseProductBtn = (props) => {
  const clickHandler = () => {
    props.decreaseProductCount(props.id);
  };
  return (
    <button
      className={s.btn_minus}
      onClick={clickHandler}
      disabled={props.count === 1}
    >
      <i className="fas fa-minus" aria-hidden="true"></i>
    </button>
  );
};

export default connect(null, {
  decreaseProductCount,
})(DecreaseProductBtn);
