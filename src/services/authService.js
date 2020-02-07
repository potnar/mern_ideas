import axios from "axios";

const login = ({ username, password }) => {
  return axios.post("auth/login", { username, password });
};

const register = ({ username, password, name, surname }) => {
  return axios.post("auth/register", { username, password, name, surname });
};

const auth = ({ token }) => {
  return axios.post("auth", { token });
};

// const funkcjazwracajacapromise = () => {
// return new Promise((resolve,reject) => {
//   //async code
//   resolve(data)
//   reject(error)
// })
// }

// funkcjazwracajacapromise().then((data) => { console.log(data); }).catch((error) => console.error(error))

export default { login, register, auth };
