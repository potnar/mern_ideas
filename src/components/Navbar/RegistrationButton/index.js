import React from "react";
import "./RegistrationButton.scss";
import { withRouter } from "react-router";

const RegistrationButton = ({ history, type }) => {
  const route = type === "register" ? "/login" : "/register";
  const label = type === "register" ? "Sign In" : "Sign Up";
  return (
    <button onClick={() => history.push(route)} className="btn--register">
      {label}
    </button>
  );
};

export default withRouter(RegistrationButton);
