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
        <button
          className={this.state.rotated ? "rotated" : "plus-button"}
          onClick={this.onRotate.bind(this)}
        ></button>
        <input className="add-idea"></input>
      </div>
    );
  }
}
