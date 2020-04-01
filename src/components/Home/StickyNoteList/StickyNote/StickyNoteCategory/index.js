import React, { useState } from "react";
// import ideas from "../../../src/api/ideas";

const StickyNoteCategory = ({ active, category, onCategoryChange }) => {
  const [arrowRotated, rotateArrow] = useState(false);
  const arrowClassName = `arrow  ${arrowRotated ? "right" : ""}`;
  const handleClick = () => {
    rotateArrow(!arrowRotated);
    onCategoryChange(category);
  };

  if (!category) {
    return null;
  }
  return (
    <div
      className="sticker__category"
      data-state={active ? "active" : ""}
      onClick={handleClick}
    >
      <div className={arrowClassName} />
      <div>&nbsp;&nbsp;</div>
      {category.name}
    </div>
  );
};

export default StickyNoteCategory;
