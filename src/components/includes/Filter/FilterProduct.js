import React from "react";

import s from "./Filter.module.scss";

const FilterProduct = (props) => {
  /* console.log(props); */
  return (
    <>
      <div className={s.filter_item}>
        <div className={s.filter_item__title}>{props.title}: </div>
        <ul>
          {props.values &&
            props.values.map((item_value) => {
              return (
                <li key={item_value.value_param}>
                  <label
                    htmlFor={item_value.value_param}
                    className={`${s.checkbox} ${s.bounce}`}>
                    <input
                      type='checkbox'
                      value={item_value.value_param}
                      name={props.param}
                      onChange={props.onChangeParams}
                      className={`${s.checkbox}`}
                      id={item_value.value_param}
                      checked={item_value.checked}
                      typeofvalue={typeof item_value.value_param}
                    />
                    <svg viewBox='0 0 21 21'>
                      <polyline points='5 10.75 8.5 14.25 16 6'></polyline>
                    </svg>
                    {item_value.value_param}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default FilterProduct;
