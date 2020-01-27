import React from "react";
import authService from "services/authService";

export default function withAuth(Component) {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      const { user } = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      console.log(user, token);
      authService
        .auth({ token })
        .then(res => res.data)
        .then(res => {
          if (res.success) {
            console.log("zalogowany");
          } else {
            console.log("niezalogowany");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    render() {
      console.log("render");
      return <Component {...this.props} />;
    }
  };
}
