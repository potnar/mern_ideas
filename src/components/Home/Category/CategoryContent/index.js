import React, { useState } from "react";
import { uid } from "react-uid";
import { connect } from "react-redux";
import ButtonAdd from "./ButtonAdd";
import ideaService from "services/ideaService";
import commentService from "services/commentService";
import "./CategoryContent.scss";
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

class CategoryContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ideas: [] };
    props.category &&
      props.category._id &&
      this.getIdeasList(props.category._id).then(ideas => {
        console.log(ideas);
        ideas.forEach(idea => {
          this[idea._id + " comment"] = React.createRef();
        });
        this.setState({ ideas });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.getIdeasList(nextProps.category._id);
    }
  }

  getIdeasList = category => {
    return ideaService
      .get({ token: this.props.token, category })
      .then(ideas => {
        this.setState({ ideas });
        return ideas;
      });
  };

  handleDeleteIdea = id => {
    ideaService
      .del({
        category: this.props.category._id,
        id,
        token: this.props.token
      })
      .then(() => {
        this.getIdeasList(this.props.category._id);
      });
  };

  handleSubmitComment = refId => {
    const { author } = this.props;
    const content = this[refId].current ? this[refId].current.value : "ERROR";
    console.log(this[refId].current);
    commentService
      .put({ content, author, token: this.props.token })
      .then(result => {
        this.getIdeasList(this.props.category._id);
      });
  };

  render() {
    const { ideas } = this.state;
    return (
      <div className="category-content">
        <div className="ideas-list">
          {ideas.map(idea => (
            <div className="idea-section">
              <div className="idea-row">
                <div className="idea" key={uid(idea)}>
                  {idea.name}
                </div>
                <div className="spacer"></div>
                <div></div>
                <IconContext.Provider value={{ className: "icons" }}>
                  <FiMessageSquare size="1.6rem" />
                  <MdDeleteForever
                    size="1.6rem"
                    className="del-button"
                    onClick={() => {
                      this.handleDeleteIdea(idea._id);
                    }}
                  />
                </IconContext.Provider>
              </div>
              {idea.comments.map(comment => (
                <div>{comment.content}</div>
              ))}
              <textarea
                ref={this[idea._id + " comment"]}
                placeholder="Add comment..."
                onKeyDown={e =>
                  e.keyCode === 13 &&
                  this.handleSubmitComment(idea._id + " comment")
                }
              ></textarea>
              <button
                onClick={() => this.handleSubmitComment(idea._id + " comment")}
              >
                dodaj
              </button>
            </div>
          ))}
        </div>
        <div className="add-idea--content">
          {this.props.category.isLoggedUser && (
            <ButtonAdd
              categoryId={this.props.category._id}
              onSubmitIdea={() => this.getIdeasList(this.props.category._id)}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  return { token: user && user.token, author: user && user._id };
};

export default connect(mapStateToProps)(CategoryContent);
