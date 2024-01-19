import axios from "axios";
import authHeader from './auth-header'
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: authHeader(),
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObj) => {
  const config = {
    headers: authHeader(),
  };

  const response = await axios.put(
    `${baseUrl}/${updatedObj.id}`,
    updatedObj,
    config,
  );
  return response.data;
};

const remove = async (blogId) => {
  const config = {
    headers: authHeader(),
  };

  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, create, update, remove };
