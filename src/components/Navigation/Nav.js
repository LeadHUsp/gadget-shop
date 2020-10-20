import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";

const Nav = (props) => {
  return (
    <header className="container-fluid d-flex ">
      <div className="container px-0">
        <nav className={s.nav_bar}>
          <button className={s.menu_toggle} onClick={props.menuToggle}>
            <i className="fas fa-bars"></i>
          </button>
          <ul
            className={`${s.nav_items_wrapper} ${props.isOpen && s.show_nav}`}
          >
            <button
              className={`${s.menu_toggle} ${s.menu_close}`}
              onClick={props.menuToggle}
            >
              <i className="fas fa-times"></i>
            </button>
            <NavLink
              className={s.nav_brand}
              to={"/"}
              onClick={props.menuToggle}
            >
              gadget shop
            </NavLink>
            {props.nav_links.map((link) => (
              <li className={s.nav_link} key={link.id}>
                <NavLink to={`${link.link}`} onClick={props.menuToggle}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={`${s.cart}`}>
            <NavLink exact to="/shoping_cart">
              <div className={s.index}>
                <i className="fas fa-shopping-bag"></i>
                <span className={s.cart_text}>Корзина</span>
                <span className={s.product_count}>
                  {props.products_in_cart.length}
                </span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Nav;
