import React, { useState } from "react";
import { render } from "react-dom";
import CommentContainer from "./CommentContainer";
import ReactStars from "react-rating-stars-component";
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IconContext } from "react-icons";
import "./IdeaContainer.scss";

const IdeaContainer = (props) => {
  const { idea } = props;
  const commentContainerRef = React.useRef(null);
  const [contentHeight, setContentHeight] = useState(null);

  const handleCloseIdea = (id) => {
    if (typeof props.onCloseIdea === "function") {
      props.onCloseIdea(id);
    } else {
      console.error(
        "function handleCloseIdea: props.onCloseIdea wasn't supplied"
      );
    }
  };

  const handleOpenIdea = (id) => {
    if (typeof props.onOpenIdea === "function") {
      props.onOpenIdea(id);
    } else {
      console.error(
        "function handleOpenIdea: props.onOpenIdea wasn't supplied"
      );
    }
  };

  React.useEffect(() => {
    if (commentContainerRef.current) {
      const { height } = commentContainerRef.current.getBoundingClientRect();
      setContentHeight(`${Math.ceil(height)}px`);
    }
  }, [commentContainerRef]);
  const ratingChanged = (newRating) => {
    props.onRating({
      value: newRating,
      author: props.author,
      idea: props.idea._id,
    });
    // console.log(newRating);
  };

  return (
    <div className="idea-section">
      <ul>
        <div className="idea-row">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            value={props.idea.avgRating}
            size={24}
            color2={"#ffd700"}
          />
          <IconContext.Provider value={{ className: "bulb" }}>
            <FaRegLightbulb size="1.6rem" />
          </IconContext.Provider>
          <div className="idea">{idea.name}</div>
          <div className="spacer"></div>
          <IconContext.Provider value={{ className: "icons" }}>
            {props.isCommentsVisible ? (
              <MdMessage
                size="1.6rem"
                onClick={() => handleCloseIdea(idea._id)}
              />
            ) : (
              <FiMessageSquare
                size="1.6rem"
                onClick={() => handleOpenIdea(idea._id)}
              />
            )}
            <MdDeleteForever
              size="1.6rem"
              className="del-button"
              onClick={() => {
                props.onDelete(idea._id);
              }}
            />
          </IconContext.Provider>
        </div>
        <div
          className={`comment-container__wrapper ${!props.isCommentsVisible ? "--hidden" : ""
            }`}
          style={{ "--contentHeight": contentHeight }}
        >
          <CommentContainer
            idea={idea}
            clickHandler={props.onComment}
            ref={commentContainerRef}
            onComment={props.onComment}
            height={contentHeight}
            onDelete={props.onDeleteComment}
          />
        </div>
      </ul>
    </div>
  );
};

export default IdeaContainer;
