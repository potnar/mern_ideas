import React from "react";
import { Component } from "react";
import axios from "axios";
import Home from "components/Home";
import "./App.scss";
import Navbar from "./components/Navbar";
import { connect } from "react-redux";
import userActions from "./store/actions/userActions";

function getMockUser() {
  return axios.get(`users?id=5df92b3b73fa4f5fc061e24a`);
}

// import $ from "jquery";
class App extends Component {
  constructor(props) {
    super(props);
    getMockUser().then(response => {
      props.login(response.data);
    });
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
      <div className="App">
        <div className="header-spacer"></div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

const mapDispatchToProps = { login: userActions.login };

//należy obydwa argumenty zadeklarować, standardowo funkcja connect, która jest pobierana z biblioteki react-redux, przyjmuje dwa argumenty mapStateToProps (czyli przekazywanie do propsów rzeczy z reduxowego store), a druga to mapDispatchToProps (czyli przekazywanie do propsów funkcji, które pozwalają zmienić stan reduxowego store), (nie trzeba ich używać jednocześnie ale jeśli chcemy użyć tylko mapDispatchToProps to w miejsce pierwszego argumentu trzeba wstawić null, w drugim wypadku nie trzeba niczego dodawać)
export default connect(null, mapDispatchToProps)(App);
