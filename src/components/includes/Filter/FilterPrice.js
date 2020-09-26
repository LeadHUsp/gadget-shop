import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./Filter.module.scss";

const FilterPrice = (props) => {
  const [param_price_low, setParam_price_low] = useState("");
  const [param_price_high, setParam_price_high] = useState("");
  const history = useHistory();

  const onChangePrice = (e) => {
    e.preventDefault();
    let params = `&${param_price_low}&${param_price_high}`;
    history.push(`?${params}`);
    props.setPriceParams(params);
    props.requestProductData(
      props.slug,
      props.page,
      3,
      `${props.checkbox_params}${props.sort_params}${params}`
    );
  };
  const onChangePriceLow = (e) => {
    if (e.target.value.trim().length === 0) {
      setParam_price_low("");
    } else {
      setParam_price_low(`${e.target.name}=${e.target.value}`);
    }
  };
  const onChangePriceHigh = (e) => {
    if (e.target.value.trim().length === 0) {
      setParam_price_high("");
    } else {
      setParam_price_high(`${e.target.name}=${e.target.value}`);
    }
  };
  return (
    <>
      <form className={s.filter_item} onSubmit={onChangePrice}>
        <div className={s.filter_item__title}>Цена: </div>
        <div className={s.filter_price}>
          <span>от</span>
          <input type='text' name='price_gt' onBlur={onChangePriceLow} />
          <span>до</span>
          <input type='text' name='price_lte' onBlur={onChangePriceHigh} />
        </div>
        <button>Подобрать по цене</button>
      </form>
    </>
  );
};
export default FilterPrice;
