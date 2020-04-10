import React, { useState } from "react";
import { uid } from "react-uid";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";
import "./CommentContainer.scss";

const CommentContainer = React.forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const { idea } = props;
  const { comments } = idea;
  if (!comments) {
    return null;
  }
  console.log(props);
  return (
    <ul ref={ref} style={{ height: props.height || "auto" }}>
      {comments.map((comment) => (
        <li key={uid(comment)}>
          <div className="comment" key={uid(comment)}>
            {comment.content}
          </div>
          <IconContext.Provider value={{ className: "icons" }}>
            <MdDeleteForever
              size="1.6rem"
              className="del-button"
              onClick={() => {
                props.onDelete(comment._id);
              }}
            />
          </IconContext.Provider>
        </li>
      ))}
      <li>
        <textarea
          placeholder="Add comment..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && props.onComment(idea._id, text)}
        ></textarea>

        <button onClick={() => props.onComment(idea._id, text)}>dodaj</button>
      </li>
    </ul>
  );
});

export default CommentContainer;
