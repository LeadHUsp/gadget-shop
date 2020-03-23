import React from "react";
import s from "./Filter.module.scss";

const FilterProduct = (props) => {
  return (
    <>
      <div className={s.filter_item}>
        <div className={s.filter_item__title}>{props.title}: </div>
        <ul>
          {props.values.map((value) => {
            return (
              <li key={value}>
                {" "}
                <label htmlFor={value} className={`${s.checkbox} ${s.bounce}`}>
                  <input
                    type="checkbox"
                    value={value}
                    name={props.param}
                    onChange={props.onChangeParams}
                    className={`${s.checkbox}`}
                    id={value}
                  />

                  <svg viewBox="0 0 21 21">
                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                  </svg>
                  {value}
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
