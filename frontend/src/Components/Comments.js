import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";

function Comments({ post }) {
  const [comment, setComment] = useState(""); // State to hold the comment
  const [comments, setComments] = useState([]);
  const user = "hari";
  // Function to handle comment submission
  const handleCommentSubmit = () => {
    // Add the new comment to the comments state
    setComments([...comments, comment]);
    // Clear the comment input field after submission
    setComment("");
  };
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
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <br />
        <button
          className="w-45 text-white font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-pink-700 dark:hover:bg-pink-800 dark:focus:ring-pink-900"
          onClick={handleCommentSubmit}
        >
          Comment
        </button>
      </div>
      {/* Display Comments */}
      {/* Display each comment */}
      {comments.map((comment, index) => (
        <div key={index} className="px-6 py-3 my-2">
          <p>
            <img
              className="w-7 h-7 absolute -ml-8"
              alt="icon"
              src="/assets/profile-img/profile-1.png"
            />
            {comment}
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
