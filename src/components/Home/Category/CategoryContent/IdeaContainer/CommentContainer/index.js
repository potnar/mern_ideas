import React, { useState } from "react";
import { uid } from "react-uid";
import "./CommentContainer.scss";

const CommentContainer = ({ comments }) => {
  console.log('comments = ', comments);
  if (!comments) {
    return null;
  }
  return (
    <ul>
      {comments.map(comment => (
        <li>
          <div className="comment" key={uid(comment)}>
            {comment.content}
          </div>
        </li>
      ))}
      <li>
        <textarea
          placeholder="Add comment..."
          // onKeyDown={e => e.keyCode === 13 && handleSubmitComment(idea._id)}
        ></textarea>
        <button>dodaj</button>
      </li>
    </ul>
  );
};

export default CommentContainer;
