import axios from "axios";
const baseUrl = "/api";

const get = (id) => {
  const request = axios.get(`${baseUrl}/persons/${id}`);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(`${baseUrl}/persons`);
  return request.then((response) => response.data);
};

const create = (newContact) => {
  const request = axios.post(`${baseUrl}/persons`, newContact);
  return request.then((response) => response.data);
};

const update = (id, newContact) => {
  const request = axios.put(`${baseUrl}/persons/${id}`, newContact);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/persons/${id}`);
  return request.then((response) => response.data);
};

export default {
  get,
  getAll,
  create,
  update,
  deleteContact,
};
