import React, { Component } from "react";
import { connect } from "react-redux";
import "./RegistrationForm.scss";
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

class RegistrationForm extends Component {
  state = { username: "", password: "", name: "", surname: "" };

  componentDidMount() {
    localStorage.removeItem("user");
    this.props.logout();
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSurnameChange = (e) => {
    this.setState({ surname: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    authService
      .register({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname,
      })
      .then((res) => {
        console.log(res);
        this.props.history.push("/login");
      })
      .catch((error) => {
        this.props.openModal({
          title: "ERROR",
          content: "couldn't register",
        });
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container__registration-form">
        <form
          className="registration-form"
          onSubmit={this.handleSubmit}
          onKeyDown={(e) => e.keyCode === 13 && this.handleSubmit(e)}
        >
          <div className="input-boxes">
            <h1>Register</h1>
            <input
              placeholder="Username..."
              onChange={this.handleUsernameChange}
              value={this.state.username}
            ></input>
          </div>
          <div className="input-boxes">
            <input
              type="password"
              placeholder="Password..."
              onChange={this.handlePasswordChange}
              value={this.state.password}
            ></input>
          </div>
          <div className="input-boxes">
            <input
              placeholder="Name..."
              onChange={this.handleNameChange}
              value={this.state.name}
            ></input>
          </div>
          <div className="input-boxes">
            <input
              placeholder="Surname..."
              onChange={this.handleSurnameChange}
              value={this.state.surname}
            ></input>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { logout: userActions.logout, openModal };

export default connect(null, mapDispatchToProps)(withRouter(RegistrationForm));
