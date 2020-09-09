import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Product.module.scss";
import { Circle } from "react-preloaders";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const Product = (props) => {
  return (
    <div className='row mx-0 justify-content-around py-4'>
      {props.products_data.map((item) => (
        <div className={s.product_card} key={item.id}>
          <NavLink
            className={s.product_link}
            to={`/${props.match.params.slug}/single_product/${item.id}`}>
            <img src={item.card_image} alt={item.title} />
          </NavLink>
          <NavLink
            className={s.product_link}
            to={`/${props.match.params.slug}/single_product/${item.id}`}>
            {item.brand} {item.series} {item.internal_memory} Gb
          </NavLink>

          <div className={s.product_price}>Цена: {item.price} грн</div>

          <div className={s.product_specifications}>
            <h4>Технические характеристики:</h4>
            <ul>
              <li>Размер экрана: {item.display_size}</li>
              <li>Материал корпуса: {item.case_material} </li>
              <li>Доступные цвета: {item.color}</li>
              <li>Встроенный накопитель: {item.internal_memory} Gb</li>
              <li>Влагозащита: {item.protect}</li>
            </ul>
          </div>
          <AddToCartButton
            text={"Купить"}
            id={item.id}
            slug={props.match.params.slug}
            price={item.price}
            title={item.title}
          />
        </div>
      ))}
      <Circle customLoading={props.isLoading} color='#f6731c' time={0} />
    </div>
  );
};

export default Product;
