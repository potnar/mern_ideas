import React, { useState } from "react";
import { uid } from "react-uid";
import { connect } from "react-redux";
import ButtonAdd from "./ButtonAdd";
import HomeButton from "./HomeButton";
import ideaService from "services/ideaService";
import commentService from "services/commentService";
import ratingService from "services/ratingService";
import "./CategoryContent.scss";
import IdeaContainer from "./IdeaContainer";

class CategoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ideas: [], active: false, openIdeas: [] };
    props.category &&
      props.category._id &&
      this.getIdeasList(props.category._id).then((ideas) => {
        this.setState({ ideas });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.getIdeasList(nextProps.category._id);
    }
  }

  getIdeasList = (category) => {
    return ideaService
      .get({ token: this.props.token, category })
      .then((ideas) => {
        // ideas.forEach(idea => {
        //   this[this.getRefId(idea._id)] = React.createRef();
        // });
        this.setState({ ideas });
        return ideas;
      });
  };

  handleCloseIdea = (id) => {
    this.setState((prevState) => {
      const openIdeas = [...prevState.openIdeas];
      openIdeas.splice(openIdeas.indexOf(id));
      return { openIdeas };
    });
  };

  handleOpenIdea = (id) => {
    this.setState((prevState) => {
      const openIdeas = [...prevState.openIdeas];
      openIdeas.push(id);
      return { openIdeas };
    });
  };

  handleDeleteIdea = (id) => {
    ideaService
      .del({
        category: this.props.category._id,
        id,
        token: this.props.token,
      })
      .then(() => {
        this.getIdeasList(this.props.category._id);
      });
  };

  handleSubmitComment = (ideaId, content = "ERROREK") => {
    const { author } = this.props;
    commentService
      .put({ content, author, token: this.props.token, idea: ideaId })
      .then((result) => {
        this.getIdeasList(this.props.category._id);
      });
  };

  handleDeleteComment = ({ id, idea }) => {
    const { token } = this.props;
    commentService
      .del({
        id,
        token,
        idea,
      })
      .then(() => {
        this.getIdeasList(this.props.category._id);
      });
  };

  // getRefId = id => `${id} comment`;

  handleRating = ({ value, author, idea }) => {
    const { token } = this.props;
    ratingService
      .post({
        token,
        value,
        author,
        idea,
      })
      .then(() => this.getIdeasList(this.props.category._id));
  };

  render() {
    const { ideas } = this.state;

    return (
      <div className="category-content">
        <HomeButton onClick={this.props.onReturn} />
        <div className="ideas-list">
          {ideas.map((idea) => (
            <IdeaContainer
              author={this.props.author}
              idea={idea}
              key={uid(idea)}
              onRating={this.handleRating}
              onComment={this.handleSubmitComment}
              onDelete={this.handleDeleteIdea}
              onCloseIdea={this.handleCloseIdea}
              onOpenIdea={this.handleOpenIdea}
              isCommentsVisible={this.state.openIdeas.includes(idea._id)}
              onDeleteComment={this.handleDeleteComment}
            />
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

const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return { token: user && user.token, author: user && user._id };
};

export default connect(mapStateToProps)(CategoryContent);
