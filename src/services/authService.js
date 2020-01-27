import axios from "axios";

const login = ({ username, password }) => {
  return axios.post("auth/login", { username, password });
};

const register = ({ username, password, name, surname }) => {
  return axios.post("auth/login", { username, password, name, surname });
};

const auth = ({ token }) => {
  console.log(token);
  return axios.post("auth", { token });
};

export default { login, register, auth };
