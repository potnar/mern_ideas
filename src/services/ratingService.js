import axios from "axios";

const get = ({ author, token }) => {
  return axios
    .get("ideas", {
      params: { author },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

const post = ({ value, author, token, idea }) => {
  return axios.post(
    //nazwa endpointu
    "ratings",
    //header.body
    { value, author, ideaId: idea },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export default { post, get };
