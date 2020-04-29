import axios from "axios";

const get = ({ author, token }) => {
  return axios
    .get("ratings", {
      params: { author },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

const post = ({ value, author, token, idea }) => {
  return axios.put(
    //nazwa endpointu
    "ratings",
    //header.body
    { value, author, idea },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export default { post, get };
