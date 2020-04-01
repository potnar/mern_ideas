import userConstans from "store/constants/userConstants";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case userConstans.LOGIN: {
      return { user: action.user };
    }
    case userConstans.LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
}
