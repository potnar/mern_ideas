import React, { Component } from "react";
import "./AuthForm.scss";
import authService from "services/authService";

class AuthForm extends Component {
  state = { username: "", password: "" };
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    authService.login({
      username: this.state.username,
      password: this.state.password
    });
  };
  render() {
    return (
      <form
        className="login-form"
        onSubmit={this.handleSubmit}
        onKeyDown={e => e.keyCode === 13 && this.handleSubmit()}
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

export default AuthForm;
