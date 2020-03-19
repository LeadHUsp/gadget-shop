import React from "react";
import NavContainer from "../Navigation/NavContainer";

const Header = () => {
  return (
    <header className="container-fluid d-flex py-3">
      <div className="col-7">
        <NavContainer />
      </div>
      <div className="col-3 d-flex justify-content-center align-items-center">
        <span>SEARCH</span>
        <i className="fas fa-search"></i>
      </div>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <span>LOGIN</span>
      </div>
    </header>
  );
};
export default Header;
