import React from "react";
import { uid } from "react-uid";
import StickyNoteCategory from "../../StickyNoteList/StickyNote/StickyNoteCategory";
import "./CategoryList.scss";

const CategoryList = ({ pickedCategoryId, categories, onCategoryChange }) => {
  return (
    <div className="container-list">
      <div className="category-list">
        {categories.map(category => (
          <StickyNoteCategory
            key={uid(category)}
            category={category}
            onCategoryChange={category => onCategoryChange(category)}
            active={pickedCategoryId === category._id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
