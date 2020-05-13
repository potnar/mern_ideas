import axios from "axios";

const get = ({ category, token }) => {
  return axios
    .get("ideas", {
      params: { category },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

const put = ({ idea, categoryId, token }) => {
  return axios.put(
    //nazwa endpointu
    "ideas",
    //header.body
    { name: idea, category: categoryId },
    //precyzowanie header authorization aby wyciagnac z headera token po stronie serwera
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const del = ({ id, category, token }) => {
  console.log("tokenDel: ", token);
  return axios
    .delete(
      //nazwa endpointu
      "ideas",
      //header.body
      {
        params: { category, id },
        //precyzowanie header authorization aby wyciagnac z headera token po stronie serwera
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => res.data);
};

export default { put, get, del };
