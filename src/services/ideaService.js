import axios from "axios";

const put = ({ idea, userId, token }) => {
  return axios.put(
    "idea",
    { name: idea, author: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export default { put };
