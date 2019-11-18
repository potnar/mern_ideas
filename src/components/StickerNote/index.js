import React from "react";
import { ideasPerPerson } from "../../mock/mock_data";
import "./StickerNote.scss";

const StickerNote = () => {
  const { user } = ideasPerPerson;
  const category = ideasPerPerson.ideas.category;

  return (
    <div className="stickers__row">
      <div className="sticker">
        <div className="sticker__title">{user}</div>
        <div className="sticker__content">{ideasPerPerson.ideas.category}</div>
      </div>
      <div className="sticker">
        <div className="sticker__title">{user}</div>
        <div className="sticker__content">{ideasPerPerson.ideas.category}</div>
      </div>
    </div>
  );
};

export default StickerNote;
