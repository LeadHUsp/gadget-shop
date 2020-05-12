import React from "react";
import s from "./ShopingCart.module.scss";
import { NavLink } from "react-router-dom";
import DeleteFromCartBtn from "./DeleteFromCartBtn/DeleteFromCartBtn";
import IncreaseProductBtn from "./ProductCountBtn/IncreaseProductBtn";
import DecreaseProductBtn from "./ProductCountBtn/DecreaseProductBtn";
import OrderFormContainer from "./OrderForm/OrderFormContainer";

const ShopingCart = (props) => {
  return (
    <div className={`${s.catalog} container`}>
      {props.items.length > 0 ? (
        <div className="row">
          <div className="col-8">
            <div className={`${s.head} row pb-4`}>
              <div className="col-3 offset-2">Продукт</div>
              <div className="col-2">Цена</div>
              <div className="col-3">Количество</div>
              <div className="col-2">Сумма</div>
            </div>
            {props.items.map((item) => {
              return (
                <div className={`${s.single_product} row py-2`} key={item.id}>
                  <div className={`${s.cart_detail} col-2`}>
                    <div className={s.card_image_data}>
                      <img src={item.card_image} alt="IMG-PRODUCT" />
                    </div>
                  </div>
                  <div className={`${s.cart_detail} col-3`}>
                    <NavLink to={`/${item.slug}/single_product/${item.id}`}>
                      {item.brand} {item.title}
                    </NavLink>
                  </div>
                  <div className={`${s.cart_detail} col-2`}>
                    {item.price} грн
                  </div>
                  <div className={`${s.cart_detail} col-3`}>
                    <div className={s.input_group}>
                      <input
                        className=""
                        type="number"
                        name="num-product1"
                        value={item.count}
                        readOnly
                      />
                      <DecreaseProductBtn id={item.id} count={item.count} />
                      <IncreaseProductBtn id={item.id} />
                    </div>
                  </div>
                  <div className={`${s.total_price} col-2`}>
                    <span>{item.count * item.price} грн</span>
                    <DeleteFromCartBtn id={item.id} text={"Удалить"} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-4">
            <OrderFormContainer />
          </div>
        </div>
      ) : (
        <div className={s.empty_cart}>Корзина пуста</div>
      )}
    </div>
  );
};
export default ShopingCart;
