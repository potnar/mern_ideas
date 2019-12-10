import React from "react";
import ButtonLogout from "./LogoutButton";
import "./Navbar.scss";
import logo from "assets/logo/Logo2.svg";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="menu-item">User Name</div>
      <div className="menu-item">
        <img className="nav__logo" src={logo} alt="logo" />
      </div>
      <div className="menu-item">
        <ButtonLogout />
      </div>
    </nav>
  );
};

export default Navbar;
