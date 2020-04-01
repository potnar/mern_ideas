import axios from "axios";

const put = ({ category, userId, token }) => {
  return axios.put(
    "categories",
    { name: category, author: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export default { put };
