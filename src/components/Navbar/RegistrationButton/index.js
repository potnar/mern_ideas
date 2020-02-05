import React from "react";
import "./RegistrationButton.scss";
import { withRouter } from "react-router";

const RegistrationButton = ({ history }) => {
  return (
    <button onClick={() => history.push("/register")} className="btn--register">
      Sign On
    </button>
  );
};

export default withRouter(RegistrationButton);
