import axios from "axios";

const put = ({ category, userId }) => {
  return axios.put("categories", { name: category, author: userId });
};

export default { put };
