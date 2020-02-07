import React, { useState } from "react";
import { uid } from "react-uid";
import { connect } from "react-redux";
import ButtonAdd from "./ButtonAdd";
import ideaService from "services/ideaService";
import "./CategoryContent.scss";

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
  render() {
    const { ideas } = this.state;
    return (
      <div className="category-content">
        <div className="ideas-list">
          {ideas.map(idea => (
            <div className="idea" key={uid(idea)}>
              {idea.name}
            </div>
          ))}
        </div>
        <div className="add-idea--content">
          <ButtonAdd
            categoryId={this.props.category._id}
            onSubmitIdea={() => this.getIdeasList(this.props.category._id)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userReducer.user.token
});

export default connect(mapStateToProps)(CategoryContent);
