import axios from "axios";

const baseUrl = "/api/video";
let token;

const setToken = () => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (videoId) => {
  setToken();
  const config = { headers: { Authorization: token } };
  const response = await axios.get(`${baseUrl}/${videoId}`, config);
  return response.data;
};

const create = async (newObject) => {
  setToken();
  const configs = {
    headers: { "Content-Type": "application/json", Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, configs);
  return response.data;
};

const update = async (id, newObject) => {
  setToken();
  const config = { headers: { Authorization: token } };
  const response = await axios.patch(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteVideo = async (id) => {
  setToken();
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// Fetch comments for a video
const getComments = async (videoId) => {
  const response = await axios.get(`${baseUrl}/${videoId}/comments`);
  return response.data;
};

// Post a comment to a video
const addComment = async (videoId, comment) => {
  setToken();
  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    `${baseUrl}/${videoId}/comments`,
    comment,
    config
  );
  return response.data;
};

export { create, getAll, getOne, update, deleteVideo, getComments, addComment };
