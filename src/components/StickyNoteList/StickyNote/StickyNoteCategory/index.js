import React, { useState } from "react";
// import ideas from "../../../src/api/ideas";

const StickyNoteCategory = ({ category }) => {
  const [arrowRotated, rotateArrow] = useState(false);
  const arrowClassName = `arrow  ${arrowRotated ? "right" : ""}`;
  if (!category) {
    return null;
  }
  return (
    <div
      className="sticker__category"
      onClick={() => rotateArrow(!arrowRotated)}
    >
      <div className={arrowClassName} />
      <div>&nbsp;&nbsp;</div>
      {category}
    </div>
  );
};

export default StickyNoteCategory;
