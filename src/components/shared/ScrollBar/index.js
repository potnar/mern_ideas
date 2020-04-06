import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

class Scrollbar extends React.Component {
  render() {
    return (
      <Scrollbars className="custom-scrollbar">
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default Scrollbar;
