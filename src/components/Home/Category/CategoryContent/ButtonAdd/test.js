import React from "react";
import "./ButtonAdds.scss";

export default class ButtonAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      rotate: false
    };
  }
  onRotate() {
    this.setState({
      rotate: true
    });
  }

  render() {
    return (
      <div className="btn">
        <button
          className={"plus-button" + (this.state.onRotate ? "rotate" : "")}
        >
          <span>&#43;</span>
        </button>
        <input className="add-idea"></input>
      </div>
    );
  }
}
