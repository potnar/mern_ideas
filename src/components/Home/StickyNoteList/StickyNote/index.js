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

function getFormattedName(note) {
  if (note && note.surname && note.name) return `${note.name} ${note.surname}`;
  return "";
}

const StickyNote = ({
  note,
  onAddCategory,
  isLoggedUser,
  onCategoryChange
}) => {
  return (
    <div className="sticker">
      <div className="sticker__title">{getFormattedName(note)}</div>
      <div className="sticker__content">
        <div>
          <StickyNoteContent
            note={note}
            onCategoryChange={onCategoryChange}
            isLoggedUser={isLoggedUser}
          />
        </div>
      </div>
      {isLoggedUser && (
        <StickyNoteInput onSubmit={value => onAddCategory(value)} />
      )}
    </div>
  );
};

const StickyNoteContent = ({ note, onCategoryChange, isLoggedUser }) => {
  const handleCategoryChange = category => {
    // const loggedUser = result.filter(user => user._id === userId)[0];
    // const noteList = [...result];
    // result.forEach((user, index) => {
    //   if (user._id === loggedUser._id) {
    //     noteList.splice(index, 1);
    //   }
    // });
    // noteList.unshift(loggedUser);
    // this.setState({ noteList });
    const categoriesList = [...note.categories];

    onCategoryChange(
      {
        ...category,
        categoriesList
      },
      isLoggedUser
    );
  };
  if (
    !note ||
    (note && !note.categories) ||
    (Array.isArray(note && note.categories) && note.categories.length === 0)
  ) {
    return "Empty category list";
  } else {
    return (
      <div>
        {note.categories.map(category => (
          <StickyNoteCategory
            key={uid(category)}
            category={category}
            onCategoryChange={category => handleCategoryChange(category)}
          />
        ))}
      </div>
    );
  }
};

export default StickyNote;
