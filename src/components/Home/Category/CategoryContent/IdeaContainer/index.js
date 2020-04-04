import React from 'react'
import CommentContainer from './CommentContainer';
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { IconContext } from "react-icons";
import PropTypes from 'prop-types'

const IdeaContainer = (props) => {
  const [
    isCommentsVisible,
    setCommentsVisible
  ] = React.useState(false);

  console.log(isCommentsVisible)

  const { idea } = props;
  return (
    <div className="idea-section">
      <ul>
        <div className="idea-row">
          <IconContext.Provider value={{ className: "bulb" }}>
            <FaRegLightbulb size="1.6rem" />
          </IconContext.Provider>
          <div className="idea">{idea.name}</div>
          <div className="spacer"></div>
          <IconContext.Provider value={{ className: "icons" }}>
            <FiMessageSquare
              size="1.6rem"
              onClick={() => setCommentsVisible(!isCommentsVisible)} />
            <MdDeleteForever
              size="1.6rem"
              className="del-button"
              onClick={() => {
                this.handleDeleteIdea(idea._id);
              }}
            />
          </IconContext.Provider>
        </div>
        <div className="comment-container__wrapper">
          <div
            className={`comment-container ${
              !isCommentsVisible ? '--hidden' : ''
            }`}>
            <CommentContainer
              comments={idea && idea.comments}
              clickHandler={props.onComment}
            />
          </div>
        </div>
      </ul>
    </div>
  )
}

export default IdeaContainer;
