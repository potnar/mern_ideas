import userConstans from "store/constants/userConstants";

const login = user => {
  return { type: userConstans.LOGIN, user };
};

const logout = () => {
  return { type: userConstans.LOGOUT };
};

export default { login, logout };
