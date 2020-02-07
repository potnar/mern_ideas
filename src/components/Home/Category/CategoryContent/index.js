import React, { useState } from "react";
import { uid } from "react-uid";
import ButtonAdd from "./ButtonAdd";
import "./CategoryContent.scss";

const CategoryContent = ({ idea, onIdeasChange, onAddIdea }) => {
  return (
    <div className="category-content">
      <div className="ideas-list">
        <div className="idea" onIdeasChange={onIdeasChange}>
          {idea}
        </div>
      </div>
      <div className="add-idea--content">
        <ButtonAdd onSubmit={value => onAddIdea(value)} />
      </div>
    </div>
  );
};

export default CategoryContent;
