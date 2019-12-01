import React from "react";
import "./ButtonLogout.scss";

const ButtonLogout = () => {
  return (
    <button onClick={() => console.log("logout")} className="btn--logout">
      Logout
    </button>
  );
};

export default ButtonLogout;
