import axios from "axios";

const getAllUserIDs = () => {
  return axios.get("users").then(res => res.data);
};

export default { getAllUserIDs };
