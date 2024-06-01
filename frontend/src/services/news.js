import axios from "axios";

const baseUrl = "/api/news";

let token;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
const create = async (newObject) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const configs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, configs);
  return response.data;
};
const update = async (id, newObject) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }

  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.patch(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteNews = async (id) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }

  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// Fetch comments for a news article
const getComments = async (newsId) => {
  const response = await axios.get(`${baseUrl}/${newsId}/comments`);
  return response.data;
};

// Post a comment to a news article
const addComment = async (newsId, comment) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    `${baseUrl}/${newsId}/comments`,
    comment,
    config
  );
  return response.data;
};

export { create, getAll, getOne, update, deleteNews, getComments, addComment };
