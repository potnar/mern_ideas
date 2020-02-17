import React, { useState } from "react";
import { uid } from "react-uid";
import { connect } from "react-redux";
import ButtonAdd from "./ButtonAdd";
import ideaService from "services/ideaService";
import "./CategoryContent.scss";
import { FiMessageSquare } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

class CategoryContent extends React.PureComponent {
  state = { ideas: [] };

  componentDidMount() {
    this.props.category && this.getIdeasList(this.props.category._id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.getIdeasList(nextProps.category._id);
    }
  }
  getIdeasList = category => {
    ideaService
      .get({ token: this.props.token, category })
      .then(ideas => this.setState({ ideas }));
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
                <FiMessageSquare size="1.6rem" />
                <MdDeleteForever
                  size="1.6rem"
                  className="del-button"
                  onClick={() => {
                    this.handleDeleteIdea(idea._id);
                  }}
                />
              </div>
              <textarea></textarea>
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

const mapStateToProps = state => ({
  token: state.userReducer.user.token
});

export default connect(mapStateToProps)(CategoryContent);
