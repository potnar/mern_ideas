import React from "react";
import Scrollbars from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const Scrollbar = React.forwardRef((props, ref) => {
  return (
    <Scrollbars
      className={`custom-scrollbar ${props.className ? props.className : ""}`}
      ref={ref}
    >
      {props.children}
    </Scrollbars>
  );
});

export default Scrollbar;
