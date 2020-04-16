import React from "react";
import s from "./DeleteFromCartBtn.module.scss";
import { connect } from "react-redux";
import { deleteProduct } from "../../../redux/shopingCartReducer";

const DeleteFromCartBtn = (props) => {
  const deleteProduct = () => {
    props.deleteProduct(props.id);
  };
  return (
    <button className={s.delete_btn} onClick={deleteProduct}>
      <i className="fas fa-trash-alt"></i>
      {props.text}
    </button>
  );
};

export default connect(null, {
  deleteProduct,
})(DeleteFromCartBtn);
