import React from "react";
import s from "./Pagination.module.scss";
import { NavLink } from "react-router-dom";

const Pagination = (props) => {
  let pages = [],
    totalPages = Number(props.totalPages),
    currentPage = Number(props.currentPage) || 1;

  if (currentPage > 1 && currentPage < totalPages) {
    pages = [currentPage - 1, currentPage, currentPage * 1 + 1];
  } else if (currentPage === totalPages && totalPages > 2) {
    pages = [currentPage - 2, currentPage - 1, currentPage];
  } else if (currentPage === 1 && totalPages > 2) {
    pages = [currentPage, currentPage * 1 + 1, currentPage * 1 + 2];
  } else if (currentPage === totalPages && currentPage !== 1) {
    pages = [currentPage - 1, currentPage];
  } else if (totalPages <= 2) {
    pages = [currentPage, currentPage * 1 + 1];
  }

  return (
    <div className={s.pagination_container}>
      <ul>
        <li>
          <NavLink className={`${s.page_link} `} to={`/${props.slug}/1`}>
            <i className="fas fa-angle-double-left"></i>
          </NavLink>
        </li>
        {pages.map((page) =>
          currentPage === page ? (
            <li key={page} className={`${s.active} ${s.skip}`}>
              <span>{page}</span>
            </li>
          ) : (
            <li key={page}>
              <NavLink to={`/${props.slug}/${page}`}>{page}</NavLink>
            </li>
          )
        )}
        <li>
          <NavLink
            className={`${s.page_link} `}
            to={`/${props.slug}/${totalPages}`}
          >
            <i className="fas fa-angle-double-right"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
