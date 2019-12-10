import React from "react";
import StickyNote from "./StickyNote";
import { uid } from "react-uid";
import "./StickyNoteList.scss";

class StickyNoteList extends React.Component {
  /*
    StickyNoteList is a container component for holding data and rendering
    the list of StickyNotes.

    1. We choose Component here because we need state for representing changes
    to the notes list (e.g filtering). Alternatively, since React v.16.8.0
    we could use stateless function with State hook,
    but we'll talk about that later...

    2. We cannot use PureComponent as
    the StickerNoteList will be accepting array of objects as property,
    hence Shallow Comparision won't work as expected
    (it only checks the references between objects, not their values)
  */

  constructor(props) {
    super(props); // if we use constructor we must include "super(props)" to do
    // anything on props. otherwise, the context will be empty.
    this.state = { categories: props.categories };
  }

  render() {
    const { noteList } = this.props;

    if (!noteList || Array.isArray(noteList) !== true) {
      return <div className="sticker-list" />;
      // later we'll add loader component here.
    }

    return (
      <div className="sticker-list">
        {/*
        We need key as we're using map function to render StickerNotes
        Uid is a cool function for getting Unique ID's, hence I've added
        the package
      */}
        {noteList &&
          noteList.map((note, index) => (
            <StickyNote key={uid(index)} note={note} />
          ))}
      </div>
    );
  }
}

export default StickyNoteList;
