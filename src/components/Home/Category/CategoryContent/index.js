import React from "react";
import { uid } from "react-uid";
import ButtonAdd from "./ButtonAdd";
import "./CategoryContent.scss";

const CategoryContent = ({ content }) => {
  return (
    <div className="category-content">
      <div className="ideas-list">
        <div className="idea"></div>
      </div>
      <div className="add-idea--content">
        <ButtonAdd />
      </div>
    </div>
  );
};

export default CategoryContent;
