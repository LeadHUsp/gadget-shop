import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";

const Nav = (props) => {
  return (
    <nav className={s.nav}>
      <NavLink className={s.nav_brand} to={"/home"}>
        NAVBRAND
      </NavLink>
      <ul className={s.nav_wrapper}>
        {props.nav_links.map((link) => (
          <li className={s.nav_link} key={link.id}>
            <NavLink to={`${link.link}`}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
