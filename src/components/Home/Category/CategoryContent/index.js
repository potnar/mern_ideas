import React, { useState } from "react";
import { uid } from "react-uid";
import { connect } from "react-redux";
import ButtonAdd from "./ButtonAdd";
import ideaService from "services/ideaService";
import commentService from "services/commentService";
import "./CategoryContent.scss";
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { IconContext } from "react-icons";
import IdeaContainer from "./IdeaContainer";

class CategoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ideas: [], active: false };
    props.category &&
      props.category._id &&
      this.getIdeasList(props.category._id).then(ideas => {
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
        // ideas.forEach(idea => {
        //   this[this.getRefId(idea._id)] = React.createRef();
        // });
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

  handleSubmitComment = (ideaId, content = "ERROREK") => {
    const { author } = this.props;
    commentService
      .put({ content, author, token: this.props.token, idea: ideaId })
      .then(result => {
        this.getIdeasList(this.props.category._id);
      });
  };

  // getRefId = id => `${id} comment`;

  render() {
    const { ideas } = this.state;
    this.state.ideas.forEach(idea => {
      // // console.log(idea.comments);
      // console.log("ref = ", this[idea._id + " comment"]);
    });

    // console.log("render ideas = ", ideas);
    return (
      <div className="category-content">
        <div className="ideas-list">
          {ideas.map(idea => (
            <IdeaContainer
              idea={idea}
              key={uid(idea)}
              onComment={this.handleSubmitComment} />
          ))}
        </div>
        <ul>
          <div className="add-idea--content">
            {this.props.category.isLoggedUser && (
              <ButtonAdd
                categoryId={this.props.category._id}
                onSubmitIdea={() => this.getIdeasList(this.props.category._id)}
              />
            )}
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  return { token: user && user.token, author: user && user._id };
};

export default connect(mapStateToProps)(CategoryContent);
