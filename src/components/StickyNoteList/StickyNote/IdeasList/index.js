import React from "react";
import { uid } from "react-uid";
import "./IdeasList.scss";

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
        {note.categories.map(category => (
          <div key={uid(category)}>{category}</div>
        ))}
      </div>
    </div>
  );
};

export default StickyNote;
