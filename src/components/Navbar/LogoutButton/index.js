import React from "react";
import "./LogoutButton.scss";

const LogoutButton = () => {
  return (
    <button onClick={() => console.log("logout")} className="btn--logout">
      Logout
    </button>
  );
};

export default LogoutButton;
