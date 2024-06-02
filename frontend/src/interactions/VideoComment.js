import React from "react";
import { getComments, addComment } from "../services/video";
import Comments from "./Comments";

const VideoComment = ({ videoId }) => {
  return (
    <Comments
      itemId={videoId}
      getComments={getComments}
      addComment={addComment}
    />
  );
};

export default VideoComment;
