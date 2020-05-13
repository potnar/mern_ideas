import React, { useState } from "react";
import { uid } from "react-uid";
import ScrollBar from "components/shared/ScrollBar";
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

  return (
    <ul
      ref={ref}
      style={{ height: props.height || "auto" }}
      className="comments-container"
    >
      <li>
        {/* <button onClick={() => props.onComment(idea._id, text)}>dodaj</button> */}
        <textarea
          placeholder="Add comment..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && props.onComment(idea._id, text)}
          className="comment-box"
        ></textarea>
      </li>
      {comments.map((comment) => (
        <li key={uid(comment)}>
          <div className="box-comment-container">
            <div className="comment" key={uid(comment)}>
              <div className="comment-content">{comment.content}</div>
            </div>
            <div className="del-button">
              <IconContext.Provider value={{ className: "icons" }}>
                <MdDeleteForever
                  size="1.6rem"
                  onClick={() => {
                    props.onDelete({ id: comment._id, idea: idea._id });
                  }}
                />
              </IconContext.Provider>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default CommentContainer;
