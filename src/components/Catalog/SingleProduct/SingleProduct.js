import React, { useState, useEffect } from 'react';
import s from './SingleProduct.module.scss';
import Swiper from 'react-id-swiper';
import AddToCartButton from '../../includes/AddToCartButton/AddToCartButton';

const SingleProduct = (props) => {
  /*  console.log(props); */
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const descriptionToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (props.photos) {
      setImages(props.photos.split(','));
    }
  }, [props.photos]);

  const params = {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    shouldSwiperUpdate: true,
    rebuildOnUpdate: true,
    containerClass: `swiper-container`,
    slideClass: `${s.slide}`,
  };
  return (
    <div className={`container ${s.catalog}`}>
      <h1 className='pb-5 text-center'>
        {props.brand} {props.series}
      </h1>
      <div className='row'>
        <div className='col-xl-5 col-md-6 col-sm-10 mx-auto'>
          <Swiper {...params}>
            {images.map((image, index) => {
              return (
                <div key={index++}>
                  <img src={image} alt={props.title} />
                </div>
              );
            })}
          </Swiper>
        </div>
        <div className='col-xl-7 col-md-6'>
          <div className='row'>
            <div className={s.tech_details}>
              <h3>Технические характеристики:</h3>
              <ul>
                {props.main_char &&
                  props.main_char.map((item) => {
                    return (
                      <li key={item.name}>
                        {item.name}: {item.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={s.price_block}>
              <div className={s.price_value}>цена: {props.price} грн</div>
              <div className={s.btn_wrapper}>
                <AddToCartButton
                  id={props.product_id}
                  slug={props.slug}
                  text={'Добавить в корзину'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.description_wrapper}>
          <div className='col-12 '>
            <h3>Описание товара:</h3>
          </div>
          <div className={`${s.description} ${isOpen ? s.show : s.hide}`}>
            {props.description}
          </div>
          {isOpen ? (
            <button className={s.toggler} onClick={descriptionToggle}>
              <i className='fas fa-angle-double-up'></i>
              Скрыть
            </button>
          ) : (
            <button className={s.toggler} onClick={descriptionToggle}>
              <i className='fas fa-angle-double-down'></i>
              Показать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
