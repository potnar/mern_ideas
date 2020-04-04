import React, { useState } from "react";
import { uid } from "react-uid";
import "./CommentContainer.scss";

const CommentContainer = React.forwardRef((props, ref) => {
  const [ text, setText ] = React.useState('');
  const { idea } = props;
  const { comments } = idea;
  if (!comments) {
    return null;
  }
  return (
    <ul ref={ref}>
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
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.keyCode === 13 && props.onComment(
            idea._id,
            text
          )}
        ></textarea>
      <button onClick={() => props.onComment(idea._id, text)}>dodaj</button>
      </li>
    </ul>
  );
});

export default CommentContainer;
