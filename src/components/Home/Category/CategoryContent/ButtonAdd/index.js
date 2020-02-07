import React from "react";
import { connect } from "react-redux";
import { uid } from "react-uid";
import "./ButtonAdd.scss";
import ideaService from "services/ideaService";

class ButtonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      idea: ""
    };
  }
  submitIdea = () => {
    const { categoryId, token } = this.props;
    const { idea } = this.state;
    ideaService.put({ idea, categoryId, token }).then(result => {
      this.setState({ idea: "" });
      this.props.onSubmitIdea(result);
    });
  };

  handleChange = e => {
    this.setState({ idea: e.target.value });
    console.log("siema");
  };
  openInput = () => {
    this.setState({ active: true });
  };

  render() {
    return (
      <div className="btn">
        <div
          className={this.state.active ? "rotated" : "plus-button"}
          onClick={this.state.active ? this.submitIdea : this.openInput}
        ></div>
        <input
          className={this.state.active ? "add-idea" : "idea"}
          placeholder="Add idea..."
          value={this.state.idea}
          onKeyDown={e => e.keyCode === 13 && this.submitIdea()}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  token: state.userReducer.user.token
});

export default connect(mapStateToProps)(ButtonAdd);
