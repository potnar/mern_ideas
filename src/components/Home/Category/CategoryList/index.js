import React from "react";
import { connect } from 'react-redux';
import { uid } from "react-uid";
import StickyNoteCategory from "../../StickyNoteList/StickyNote/StickyNoteCategory";
import "./CategoryList.scss";

const CategoryList = ({
  pickedCategoryId,
  categories,
  onCategoryChange,
  user
}) => {
  return (
    <div className="container-list">
      <div className="category-list">
        {categories.map(category => {
          const isLoggedUser = category.author === user._id;
          return (
            <StickyNoteCategory
              key={uid(category)}
              category={category}
              onCategoryChange={category => {
                onCategoryChange(category, isLoggedUser)
              }}
              active={pickedCategoryId === category._id}
            />
          );
        })}
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(CategoryList);
