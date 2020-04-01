import React, { useState } from "react";
import "./StickyNoteInput.scss";

const StickyNoteInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <div
      className="sticky-note__input"
      onKeyDown={e => e.keyCode === 13 && handleSubmit()}
    >
      <div className="btn-arrow" onClick={handleSubmit}>
        <div className="arrow__wrapper">
          <div className="arrow"></div>
        </div>
      </div>
      <input
        placeholder="dodaj kategorie"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="field-category"
      />
    </div>
  );
};

export default StickyNoteInput;
