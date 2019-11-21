import React from "react";
import StickyNoteList from "./components/StickyNoteList";
import { noteList } from "./mock/notes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StickyNoteList noteList={noteList} />
    </div>
  );
}

export default App;
