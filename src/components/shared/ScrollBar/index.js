import React from "react";
import Scrollbars from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

class Scrollbar extends React.Component {
  render() {
    return (
      <Scrollbars
        className={`custom-scrollbar ${
          this.props.className ? this.props.className : ""
        }`}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default Scrollbar;
