import React from "react";
import { Component } from "react";
import axios from "axios";
import StickyNoteList from "components/StickyNoteList";
import { noteList } from "mock/notes";
import "./App.scss";
import Navbar from "./components/Navbar";

async function getMockUser() {
  await axios.get(`users?id=5df92b3b73fa4f5fc061e24a`).then(result => {
    return result.data;
  });
}

getMockUser();
// import $ from "jquery";
class App extends Component {
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
        <StickyNoteList noteList={noteList} />
      </div>
    );
  }
}

export default App;
