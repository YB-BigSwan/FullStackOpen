import axios from "axios";
const baseUrl = import.meta.env.VITE_COUNTRIES_BASE_URL;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
