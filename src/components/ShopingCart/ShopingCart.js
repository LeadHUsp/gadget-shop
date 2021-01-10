import React from 'react';
import s from './ShopingCart.module.scss';
import { NavLink } from 'react-router-dom';
import DeleteFromCartBtn from './DeleteFromCartBtn/DeleteFromCartBtn';
import IncreaseProductBtn from './ProductCountBtn/IncreaseProductBtn';
import DecreaseProductBtn from './ProductCountBtn/DecreaseProductBtn';
import OrderFormContainer from './OrderForm/OrderFormContainer';

const ShopingCart = (props) => {
  return (
    <div className={`${s.catalog} container`}>
      {props.items.length > 0 ? (
        <div className='row'>
          <div className={`${s.single_product_wrapper} col-lg-10 col-xl-8 mx-lg-auto`}>
            <div className={`${s.head} row pb-4`}>
              <div className={`${s.cart_detail_wrapper} col-md-10 offset-2`}>
                <div className='col-md-3'>Продукт</div>
                <div className='col-md-3'>Цена</div>
                <div className='col-md-3'>Количество</div>
                <div className='col-md-3'>Сумма</div>
              </div>
            </div>
            {props.items.map((item) => {
              return (
                <div className={`${s.single_product} row py-2`} key={item.id}>
                  <div className={`${s.cart_detail} col-md-2`}>
                    <div className={s.card_image_data}>
                      <img src={item.card_image} alt='IMG-PRODUCT' />
                    </div>
                  </div>
                  <div className={`${s.cart_detail_wrapper} col-md-10`}>
                    <div className={`${s.cart_detail} col-md-3`}>
                      <NavLink to={`/${item.slug}/single_product/${item.id}`}>
                        {item.brand} {item.title}
                      </NavLink>
                    </div>
                    <div className={`${s.cart_detail} col-md-3`}>{item.price} грн</div>
                    <div className={`${s.cart_detail} col-md-3`}>
                      <div className={s.input_group}>
                        <input
                          className=''
                          type='number'
                          name='num-product1'
                          value={item.count}
                          readOnly
                        />
                        <DecreaseProductBtn id={item.id} count={item.count} />
                        <IncreaseProductBtn id={item.id} />
                      </div>
                    </div>
                    <div className={`${s.total_price} col-md-3`}>
                      <span>{item.count * item.price} грн</span>
                      <DeleteFromCartBtn id={item.id} text={'Удалить'} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='col-lg-6 col-xl-4 mx-lg-auto pt-3'>
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
