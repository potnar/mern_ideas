import React from "react";
import ButtonLogout from "./LogoutButton";
import "./Navbar.scss";
import logo from "assets/logo/Logo2.svg";
import { connect } from "react-redux";

const Navbar = ({ user }) => {
  return (
    <nav className="nav">
      <div className="menu-item">{(user && user.username) || ""}</div>
      <div className="menu-item">
        <img className="nav__logo" src={logo} alt="logo" />
      </div>
      <div className="menu-item">
        <ButtonLogout />
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Navbar);
