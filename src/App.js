import React from "react";
import { Component } from "react";
import axios from "axios";
import Home from "components/Home";
import "./App.scss";
import Modal from "components/shared/Modal";
import Navbar from "./components/Navbar";
import LoginForm from "components/LoginForm";
import RegistrationForm from "components/RegistrationForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import withAuth from "components/shared/hoc/withAuth";

// import $ from "jquery";
class App extends Component {
  constructor(props) {
    super(props);
    // this.setLocalUserToRedux();
  }

  //lepiej tego nie używać, ale w ten sposób używa się jQuery w react
  // class App extends Component {

  // componentDidMount() {
  //   const nav = $(".nav");
  //   const spacer = $(".header-spacer");
  //   spacer.height(nav.outerHeight());
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-spacer"></div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={withAuth(Home)} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/" component={withAuth(Home)} />
          </Switch>
          <Modal />
        </div>
      </Router>
    );
  }
}

export default App;
