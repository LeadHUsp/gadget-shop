import React from "react";

import s from "./Filter.module.scss";

const FilterPrice = (props) => {
  const onChangePrice = (e) => {
    e.preventDefault();
    props.pushFilterParamsToUrl();
    let searchUrl = props.concatSearchUrl();
    props.requestProductData(
      props.match.params.slug,
      props.match.params.page,
      4,
      searchUrl
    );
  };

  const onChangePriceLow = (e) => {
    if (e.target.value.trim().length === 0) {
      props.setLowPriceParam("");
    } else {
      props.setLowPriceParam(e.target.value);
    }
  };
  const onChangePriceHigh = (e) => {
    if (e.target.value.trim().length === 0) {
      props.setHighPriceParam(e.target.value);
    } else {
      props.setHighPriceParam(e.target.value);
    }
  };
  return (
    <>
      <div className={s.filter_item}>
        <div className={s.filter_item__title}>Цена: </div>
        <div className={s.filter_price}>
          <span>от</span>
          <input
            type="text"
            onChange={onChangePriceLow}
            value={props.price_params.price_gt}
          />
          <span>до</span>
          <input
            type="text"
            onChange={onChangePriceHigh}
            value={props.price_params.price_lte}
          />
        </div>
        <div className={s.btn_wrapper}>
          <button className={s.btn_price} onClick={onChangePrice}>
            Подобрать по цене
          </button>
          <button className={s.btn_price} onClick={props.clearFilterParams}>
            {" "}
            Сбросить фильтр{" "}
          </button>
        </div>
      </div>
    </>
  );
};
export default FilterPrice;
