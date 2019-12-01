import React from "react";
import ButtonLogout from "./ButtonLogout";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="menu-item">User Name</div>
      <div className="menu-item">CM</div>
      <div className="menu-item">
        <ButtonLogout />
      </div>
    </nav>
  );
};

export default Navbar;
