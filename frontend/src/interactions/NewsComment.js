import React from "react";
import { getComments, addComment } from "../services/news";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";

const NewsComment = ({ newsId, setMessage }) => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Comments
      itemId={newsId}
      getComments={getComments}
      addComment={addComment}
      setMessage={setMessage}
      redirectToLogin={redirectToLogin}
    />
  );
};

export default NewsComment;
