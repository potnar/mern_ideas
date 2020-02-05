import React, { Component } from "react";
import { connect } from "react-redux";
import "./RegistrationForm.scss";
import authService from "services/authService";
import { withRouter } from "react-router";
import userActions from "store/actions/userActions";

/*
RegisterForm - musisz w dowolny sposób wyrenderować formularz rejestracji, który onSubmit będzie wykonywał 
authService.register({ username, password, name, surname })
.then(res => res.data).then(user => alert('sukces'); console.log(user);); 
... czy coś w tym stylu
*/

class RegistrationForm extends Component {
  state = { username: "", password: "", name: "", surname: "" };

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
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSurnameChange = e => {
    this.setState({ surname: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    authService
      .registration({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname
      })
      .then(res => {
        console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: {
              _id: res.data.user._id,
              token: res.data.user.token
            }
          })
        );
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.handleSubmit}
        onKeyDown={e => e.keyCode === 13 && this.handleSubmit(e)}
      >
        <input
          placeholder="Username..."
          onChange={this.handleUsernameChange}
          value={this.state.username}
        ></input>
        <input
          type="password"
          placeholder="Password..."
          onChange={this.handlePasswordChange}
          value={this.state.password}
        ></input>
        <input
          placeholder="Name..."
          onChange={this.handleNameChange}
          value={this.state.name}
        ></input>
        <input
          placeholder="Surname..."
          onChange={this.handleSurnameChange}
          value={this.state.surname}
        ></input>
        <button type="submit">Register</button>
      </form>
    );
  }
}

const mapDispatchToProps = { logout: userActions.logout };

export default connect(null, mapDispatchToProps)(withRouter(RegistrationForm));
