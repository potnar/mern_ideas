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
  const scrollbarRef = React.useRef(null);

  if (!comments) {
    return null;
  }

  React.useEffect(() => {
    console.log(scrollbarRef);
    if (scrollbarRef.current) {
      console.log(scrollbarRef.current.scrollTop);
    }
  }, [scrollbarRef]);

  return (
    <ul
      ref={ref}
      style={{ height: props.height || "auto" }}
      className="comments-container"
      onKeyDown={(e) => e.keyCode === 13 && props.onComment(idea._id, text)}
    >
      <ul className="comments-list">
        <ScrollBar className="comment-scrollbar" ref={scrollbarRef} >
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
        </ScrollBar>
      </ul>
      <li>
        <textarea
          placeholder="Add comment..."
          onChange={(e) => setText(e.target.value)}
          className="comment-box"
        ></textarea>
      </li>
      <li>
        <button onClick={() => props.onComment(idea._id, text)}>dodaj</button>
      </li>

    </ul>
  );
});

export default CommentContainer;
