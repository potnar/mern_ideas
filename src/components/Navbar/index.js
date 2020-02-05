import React from "react";
import ButtonLogout from "./LogoutButton";
import RegistationButton from "./RegistrationButton";
import "./Navbar.scss";
import logo from "assets/logo/Logo2.svg";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import withAuth from "components/shared/hoc/withAuth";

const Navbar = ({ user }) => {
  return (
    <Router>
      <nav className="nav">
        <div className="menu-item">{(user && user.username) || ""}</div>
        <div className="menu-item">
          <img className="nav__logo" src={logo} alt="logo" />
        </div>
        <div className="menu-item">
          <Switch>
            <Route exact path="/" component={withAuth(ButtonLogout)} />
            <Route path="/login" component={RegistationButton} />
            <Route path="/" component={withAuth(ButtonLogout)} />
          </Switch>
        </div>
      </nav>
    </Router>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Navbar);
