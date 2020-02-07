import React from "react";
import ButtonLogout from "./LogoutButton";
import RegistrationButton from "./RegistrationButton";
import "./Navbar.scss";
import logo from "assets/logo/Logo2.svg";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Navbar = ({ user, location }) => {
  console.log(location);
  return (
    <nav className="nav">
      <div className="menu-item">{(user && user.username) || ""}</div>
      <div className="menu-item">
        <img className="nav__logo" src={logo} alt="logo" />
      </div>
      <div className="menu-item">
        {user && user.token ? (
          <ButtonLogout />
        ) : (
          <RegistrationButton
            type={location.pathname === "/register" ? "register" : "login"}
          />
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(withRouter(Navbar));
