import axios from "axios";
async function getMockUser() {
  await axios.get(`users?id=5df92b3b73fa4f5fc061e24a`).then(result => {
    return result.data;
  });
}

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "LOGIN": {
      return { user: action.user };
    }
    case "LOGOUT": {
      return {};
    }
    default: {
      return state;
    }
  }
}
