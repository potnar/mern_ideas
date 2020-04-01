import React from "react";
import StickyNote from "./StickyNote";
import { uid } from "react-uid";
import "./StickyNoteList.scss";
import { connect } from "react-redux";
import StickyNoteCategory from "./StickyNote/StickyNoteCategory";
import categoryService from "services/categoryService";
import userService from "services/userService";
import userActions from "store/actions/userActions";
import { openModal } from "store/actions/modalActions";

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

  // constructor(props) {
  //   super(props); // if we use constructor we must include "super(props)" to do
  //   // anything on props. otherwise, the context will be empty.
  //   this.state = { categories: props.categories };
  // }
  state = { noteList: [] };

  componentDidMount() {
    // console.log("componentDidMount", this.props.user);
    this.props.user && this.getNoteList(this.props.user._id);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps", nextProps.user);
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.getNoteList(nextProps.user._id, nextProps.user.token);
    }
  }

  getNoteList = (userId, token) => {
    userService
      .getAllUserIDs({ token: token || this.props.user.token })
      .then(result => {
        const loggedUser = result.filter(user => user._id === userId)[0];
        const noteList = [...result];

        result.forEach((user, index) => {
          if (user._id === loggedUser._id) {
            noteList.splice(index, 1);
          }
        });

        noteList.unshift(loggedUser);
        this.setState({ noteList });
      });
  };

  handleAddCategory = category => {
    const userId = this.props.user._id;
    //funkcja dodająca kategorię
    categoryService
      .put({ category, userId, token: this.props.user.token })
      .then(res => this.getNoteList(userId))
      .catch(err => {
        this.props.openModal({
          title: "ERROR",
          content: "couldn't add category"
        });
        console.error(err);
      });
  };

  render() {
    const { noteList } = this.state;
    const { onCategoryChange } = this.props;

    return (
      <div className="sticker-list">
        {/*
        We need key as we're using map function to render StickerNotes
        Uid is a cool function for getting Unique ID's, hence I've added
        the package
      */}
        {noteList &&
          noteList.map((note, index) => (
            <StickyNote
              key={uid(index)}
              note={note}
              onCategoryChange={onCategoryChange}
              onAddCategory={this.handleAddCategory}
              isLoggedUser={index === 0}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = { openModal };

export default connect(mapStateToProps, mapDispatchToProps)(StickyNoteList);
