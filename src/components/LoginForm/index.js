import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoginForm.scss";
import authService from "services/authService";
import { withRouter } from "react-router";
import userActions from "store/actions/userActions";
import { openModal } from "store/actions/modalActions";

/*
RegisterForm - musisz w dowolny sposób wyrenderować formularz rejestracji, który onSubmit będzie wykonywał 
authService.register({ username, password, name, surname })
.then(res => res.data).then(user => alert('sukces'); console.log(user);); 
... czy coś w tym stylu
*/

class LoginForm extends Component {
  state = { username: "", password: "" };

  //odpala się gdy component zamontuje się na DOM'ie (lifeCycle method)
  componentDidMount() {
    localStorage.removeItem("user");
    this.props.logout();
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    authService
      .login({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: {
              username: res.data.user.username,
              _id: res.data.user._id,
              token: res.data.user.token
            }
          })
        );
        this.props.history.push("/");
      })
      .catch(error => {
        this.props.openModal({
          title: "ERROR",
          content: "couldn't login"
        });
        console.error(error);
      });
  };

  render() {
    return (
      <form
        className="login-form"
        onSubmit={this.handleSubmit}
        onKeyDown={e => e.keyCode === 13 && this.handleSubmit(e)}
      >
        <input
          placeholder="Username"
          onChange={this.handleUsernameChange}
          value={this.state.username}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={this.handlePasswordChange}
          value={this.state.password}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    );
  }
}

const mapDispatchToProps = { logout: userActions.logout, openModal };

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
