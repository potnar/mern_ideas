import React from "react";
import "./ButtonAdd.scss";

export default class ButtonAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      rotated: false
    };
  }
  onRotate() {
    this.setState({
      rotated: true
    });
  }

  render() {
    return (
      <div className="btn">
        <div
          className={this.state.rotated ? "rotated" : "plus-button"}
          onClick={this.onRotate.bind(this)}
        ></div>
        <input
          className={this.state.rotated ? "add-idea" : "idea"}
          placeholder="Add idea..."
        ></input>
      </div>
    );
  }
}
