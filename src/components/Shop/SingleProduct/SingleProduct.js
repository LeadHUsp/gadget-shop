import React, { useState, useEffect } from "react";
import s from "./SingleProduct.module.scss";
import Swiper from "react-id-swiper";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const SingleProduct = (props) => {
  /*  console.log(props); */
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const descriptionToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (props.photos) {
      setImages(props.photos.split(","));
    }
  }, [props.photos]);

  const params = {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    shouldSwiperUpdate: true,
    rebuildOnUpdate: true,
    containerClass: `swiper-container`,
    slideClass: `${s.slide}`,
  };
  return (
    <div className={`container ${s.catalog}`}>
      <h1 className="pb-5 text-center">
        {props.brand} {props.series}
      </h1>
      <div className="row">
        <div className="col-5">
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
        <div className="col-7">
          <div className="row">
            <div className={s.tech_details}>
              <h3>Технические характеристики:</h3>
              <ul>
                <li>Бренд: {props.brand}</li>
                <li>Серия: {props.series} </li>
                <li>Цвет: {props.color}</li>
                <li>Материал корпуса: {props.case_material}</li>
                <li>Влагозащита: {props.protect}</li>
                <li>
                  Наличие быстрой зарядки: {props.quick_charge ? "да" : "нет"}
                </li>
                <li>Тип дисплея: {props.display_type} </li>
                <li>Размер дисплея: {props.display_size} </li>
                <li>Разрешение экрана: {props.display_resolution} </li>
                <li>Объем оперативной памяти: {props.RAM} Gb </li>
                <li>
                  Объем внутреннего накопителя: {props.internal_memory} Gb
                </li>
              </ul>
            </div>
            <div className={s.price_block}>
              <div className="px-0">цена: {props.price} грн</div>
              {/* <div className={s.select_options}>
                <div onClick={colorsShowToggle}>
                  Доступные модификации
                  <button>
                    <i className="fas fa-angle-down"></i>
                  </button>
                </div>
                <div
                  className={` ${
                    isShowOptions ? s.show_options : s.hide_options
                  }`}
                >
                  {colors.map((color, index) => {
                    return (
                      <div className={s.options} key={index++}>
                        {color}
                      </div>
                    );
                  })}
                </div>
              </div> */}
              <AddToCartButton text={"Добавить в корзину"} />
            </div>
          </div>
        </div>
      </div>
      <div className="row relative">
        <div className="col-12 ">
          <h3>Описание товара:</h3>
        </div>
        <div className={`${s.description} ${isOpen ? s.show : s.hide}`}>
          {props.description}
        </div>
        {isOpen ? (
          <button className={s.toggler} onClick={descriptionToggle}>
            <i className="fas fa-angle-double-up"></i>
            Скрыть
          </button>
        ) : (
          <button className={s.toggler} onClick={descriptionToggle}>
            <i className="fas fa-angle-double-down"></i>
            Показать
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
