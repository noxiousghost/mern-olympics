import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Moment from "react-moment";
import { getComments, addComment } from "../services/news";
import { getUser } from "../services/token"; // Importing the getUser function

function Comments({ newsId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      try {
        const user = getUser(); // Getting the logged-in user information
        const newComment = await addComment(newsId, { text: comment });

        // Adding the postedBy field with the current user's information to the new comment
        newComment.postedBy = {
          username: user.username,
        };

        setComments([...comments, newComment]);
        setComment("");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message || "Failed to post comment");
      }
    } else {
      setErrorMessage("Please enter a comment before submitting.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(newsId);
      setComments(response);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  return (
    <div className="my-3">
      <span className="text-wheatt font-bold md:text-xl lg:text-2xl">
        Comments
      </span>
      <hr className="mt-4 h-1 display-1" />
      <div className="my-4">
        {/* Form for submitting comments */}
        <textarea
          className="w-1/2 h-16 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Write your comment here..."
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1 -mb-2">{errorMessage}</p>
        )}
        <div className="mt-4">
          <button
            className="w-45 text-white font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-pink-700 dark:hover:bg-pink-800 dark:focus:ring-pink-900"
            onClick={handleCommentSubmit}
          >
            Comment
          </button>
        </div>
      </div>

      {comments.map((comment, index) => (
        <div key={index} className="px-6 py-3 my-2">
          <p className="relative">
            <img
              className="w-7 h-7 absolute -ml-8"
              alt="icon"
              src="/assets/profile-img/profile-1.png"
            />
            {comment.postedBy && comment.postedBy.username}: {comment.text}
          </p>
          <p>
            <Moment fromNow>{comment.postedAt}</Moment>
          </p>
          <div className="mt-2 gap-x-3 flex items-center">
            <button className="mr-2">
              <FaThumbsUp />
            </button>
            <button className="mr-2">
              <FaThumbsDown />
            </button>
            <a href="#" className="mr-2 text-blue-500 hover:underline">
              Reply
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
