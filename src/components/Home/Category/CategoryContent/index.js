import React from "react";
import ButtonAdd from "./ButtonAdd";
import "./CategoryContent.scss";

const CategoryContent = ({ content }) => {
  return (
    <div className="category-content">
      <div className="add-idea--content">
        <ButtonAdd />
      </div>
    </div>
  );
};

export default CategoryContent;
