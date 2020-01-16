import axios from "axios";

const login = ({ username, password }) => {
  return axios.post("auth/login", { username, password });
};

const register = ({ username, password, name, surname }) => {
  return axios.post("auth/login", { username, password, name, surname });
};

export default { login, register };
