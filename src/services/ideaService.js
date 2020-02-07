import axios from "axios";

const get = ({ category, token }) => {
  return axios
    .get("ideas", {
      params: { category },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data);
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

export default { put, get };
