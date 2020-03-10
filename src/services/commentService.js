import axios from "axios";

const get = ({ author, token }) => {
  return axios
    .get("ideas", {
      params: { author },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data);
};

const put = ({ content, author, token }) => {
  return axios.put(
    //nazwa endpointu
    "comments",
    //header.body
    { content, author },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const del = ({ id, author, token }) => {
  return axios
    .delete(
      //nazwa endpointu
      "comments",
      //header.body
      {
        params: { author, id },
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => res.data);
};

export default { put, get, del };
