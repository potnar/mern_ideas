import React from "react";
import "./ButtonAdd.scss";

export default class ButtonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotated: false,
      idea: ""
    };
  }

  handleChange = (e, { onSubmit }) => {
    this.setState({ idea: e.target.value, rotated: true });
    setValue("");
  };

  render() {
    return (
      <div className="btn">
        <div
          className={this.state.rotated ? "rotated" : "plus-button"}
          onClick={this.handleChange}
          onKeyDown={e => e.keyCode === 13 && this.handleChange()}
        ></div>
        <input
          className={this.state.rotated ? "add-idea" : "idea"}
          placeholder="Add idea..."
          onChange={}
        ></input>
      </div>
    );
  }
}
