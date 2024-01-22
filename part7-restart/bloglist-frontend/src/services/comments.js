import axios from 'axios';
const baseUrl = '/api/blogs';

const getBlogComments = async (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}/comments`);
  return request.then((response) => response.data);
}

const create = async (commentObj) => {
  const blogId = commentObj.blogId;
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObj);
  return response.data;
}

export default { create, getBlogComments };
