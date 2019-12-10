import React from "react";
import { Component } from "react";
import StickyNoteList from "components/StickyNoteList";
import { noteList } from "mock/notes";
import "./App.scss";
import Navbar from "./components/Navbar";

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
        <div class="header-spacer"></div>
        <Navbar />
        <StickyNoteList noteList={noteList} />
      </div>
    );
  }
}

export default App;
