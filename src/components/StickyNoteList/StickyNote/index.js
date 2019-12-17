import React from "react";
import { uid } from "react-uid";
import "./StickyNote.scss";
import StickyNoteCategory from "./StickyNoteCategory";
import StickyNoteInput from "./StickyNoteInput";

/*
we write "const StickyNote = " instead of "export default () => {}"
(exporting anynomyous function) because in React Dev Tools you won't be able to
track your components name
*/

const StickyNote = ({ note }) => {
  if (!note) {
    return null;
  }
  return (
    <div className="sticker">
      <div className="sticker__title">{note.user}</div>
      <div className="sticker__content">
        <div />
        <div>
          {note.categories.map(category => (
            <StickyNoteCategory key={uid(category)} category={category} />
          ))}
        </div>
        <div />
      </div>
      <StickyNoteInput onSubmit={value => console.log("submitting: ", value)} />
    </div>
  );
};

export default StickyNote;
