import React, { useState } from "react";
import { uid } from "react-uid";
import "./CommentContainer.scss";

const CommentContainer = ({ idea }, state) => {
  const textAreaRef = React.useRef(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="comment-container">
      {idea.comments.map(comment => (
        <ul>
          <li>
            <div className="comment" key={uid(comment)}>
              {comment.content}
            </div>
          </li>
        </ul>
      ))}
      <ul>
        <li>
          <textarea
            ref={textAreaRef}
            placeholder="Add comment..."
            // onKeyDown={e => e.keyCode === 13 && handleSubmitComment(idea._id)}
          ></textarea>
          <button>dodaj</button>
        </li>
      </ul>
    </div>
  );
};

export default CommentContainer;
