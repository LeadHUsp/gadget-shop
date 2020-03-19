import React from "react";
import s from "./HomePage.module.scss";
import Swiper from "react-id-swiper";
import { NavLink } from "react-router-dom";
import { dateTranslater } from "../utils/date";

const HomePage = (props) => {
  const params = {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    shouldSwiperUpdate: true,
    rebuildOnUpdate: true,
    containerClass: `swiper-container ${s.swiper_wrapper}`
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 px-0">
            <Swiper {...params}>
              {props.promo_items.map((item) => (
                <div key={item.id} className={s.slide}>
                  <div
                    className={s.slide_image}
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}
                  ></div>
                  <div className={s.slide_description}>
                    <div className="col-12"> {item.promo_description} </div>
                    <div className="col-12 d-flex justify-content-center">
                      <NavLink to={item.link} className={s.learn_more}>
                        <span className={s.circle} aria-hidden="true">
                          <span className={`${s.icon} ${s.arrow}`}></span>
                        </span>
                        <span className={s.button_text}>К покупкам</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-12">
            <h2 className={s.title}>Наши товары</h2>
          </div>
          {props.categories_items.map((item) => (
            <div
              className={`col-xs-12 col-lg-6 ${s.card}`}
              key={item.id}
              style={{
                backgroundImage: `url(${item.main_image})`
              }}
            >
              <div className={s.card_front}>
                <NavLink to={`/${item.slug}`} className={s.learn_more}>
                  <span className={s.circle} aria-hidden="true">
                    <span className={`${s.icon} ${s.arrow}`}></span>
                  </span>
                  <span className={s.button_text}>
                    Перейти в раздел {item.name}
                  </span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <h2 className={s.title}>Наши статьи</h2>
          </div>
          {props.blog_items.map((item) => (
            <div className="col-xs-12 col-lg-4" key={item.id}>
              <NavLink to={`blog/${item.id}`} className={s.blog_link}>
                <img src={`${item.image}`} alt="article" className={s.img} />
              </NavLink>
              <div className={s.description}>
                <h4 className="pb-3">{item.title}</h4>
                <span className="small-txt">
                  By {item.author} on {dateTranslater(item.updated_at)}
                </span>
                <p className="pt-4">{item.annotation} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
