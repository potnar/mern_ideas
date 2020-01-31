import axios from "axios";

const getAllUserIDs = ({ token }) => {
  return axios
    .get("users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data);
};

export default { getAllUserIDs };
