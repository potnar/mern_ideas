import React from "react";
import "./LogoutButton.scss";
import { withRouter } from "react-router";

const LogoutButton = ({ history }) => {
  return (
    <button onClick={() => history.push("/login")} className="btn--logout">
      Logout
    </button>
  );
};

export default withRouter(LogoutButton);
