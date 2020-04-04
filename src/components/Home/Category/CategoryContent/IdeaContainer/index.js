import React from 'react'
import CommentContainer from './CommentContainer';
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IconContext } from "react-icons";
import PropTypes from 'prop-types'

const IdeaContainer = (props) => {
  const commentContainerRef = React.useRef(null);
  const [ contentHeight, setContentHeight ] = React.useState('0px');
  const [
    isCommentsVisible,
    setCommentsVisible
  ] = React.useState(false);

  React.useEffect(() => {
    const { height } = commentContainerRef.current.getBoundingClientRect();
    setContentHeight(`${Math.ceil(height)}px`);
  }, [ commentContainerRef ]);

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
            {isCommentsVisible ? (
              <MdMessage
                size="1.6rem"
                onClick={() => setCommentsVisible(!isCommentsVisible)} />
            ) : (
              <FiMessageSquare
                size="1.6rem"
                onClick={() => setCommentsVisible(!isCommentsVisible)} />
            )}
            <MdDeleteForever
              size="1.6rem"
              className="del-button"
              onClick={() => {
                this.handleDeleteIdea(idea._id);
              }}
            />
          </IconContext.Provider>
        </div>
        <div className={`comment-container__wrapper ${
          !isCommentsVisible ? '--hidden' : ''
        }`} style={{ '--contentHeight': contentHeight }}>
          <CommentContainer
            idea={idea}
            clickHandler={props.onComment}
            ref={commentContainerRef}
            onComment={props.onComment}
          />
        </div>
      </ul>
    </div>
  )
}

export default IdeaContainer;
