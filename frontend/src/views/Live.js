import React, { useEffect, useState } from "react";
import VideoCard from "../Components/VideoCard";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/video";
import Loading from "../Components/Loading";
import NotExists from "../Components/NotExists";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";
import emojiFlag from "emoji-flag";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
countries.registerLocale(englishCountries);

const brazil = emojiFlag("BR");
const germany = emojiFlag("DE");

const Live = ({ user, setMessage }) => {
  const [comment, setComment] = useState(""); // State to hold the comment
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recents, setRecents] = useState([]);
  useEffect(() => {
    let loggedUser = null;
    if (user !== null) {
      loggedUser = user;
    } else {
      const localUser = window.localStorage.getItem("loggedInOlympicsUser");
      loggedUser = JSON.parse(localUser);
    }

    if (loggedUser === null) {
      navigate("/login");
      setMessage({
        message: "Must login to watch live videos!!",
        className: "warning",
      });
    } else {
      const fetch = async () => {
        try {
          const fetchedData = await getAll();
          setRecents(fetchedData);
          setIsLoading(false);
        } catch (error) {
          setMessage({
            message: `${error.response.data.error}`,
            className: "error",
          });
        }
      };

      fetch();
    }
  }, []);
  // Function to handle comment submission
  const handleCommentSubmit = () => {
    // Add the new comment to the comments state
    setComments([...comments, comment]);
    // Clear the comment input field after submission
    setComment("");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mb-8 w-full flex justify-center">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Live
        </span>
      </div>

      {/* <ToastContainer position="top-right" /> */}
      <div className="flex justify-end h-auto live-video lg:justify-center">
        <div className="flex flex-row absolute mt-2 justify-end text-wheatt w-80 md:w-96 lg:w-full">
          <span className="bg-red-600 font-medium lg:p-1 mr-8 rounded-lg  lg:mr-60">
            Live
          </span>
        </div>
        {/* <ReactPlayer url="/assets/live-video/swimming.mp4" controls={true} autoPlay muted={true} /> */}
        <video autoPlay controls muted loop>
          <source src="/assets/live-video/football.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="text-wheatt font-bold py-2 md:px-10 md:mx-10 md:my-2">
        <span style={{ fontSize: "30px" }} role="img" aria-label={"BR"}>
          {brazil}
        </span>
        <span className="text-sm md:text-3xl"> Brazil Vs.Germany </span>
        <span style={{ fontSize: "30px" }} role="img" aria-label={"DE"}>
          {germany}
        </span>
        <span className="text-sm md:text-3xl">
          &nbsp;Men's Football ⚽ Live Payris 2024!
        </span>
      </div>
      {/* Comment Section */}
      <div className="my-6">
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

      <div className="my-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Recent uploads
        </span>
        <hr className=" mt-4 h-1" />
      </div>

      {isLoading ? (
        <Loading />
      ) : recents.length > 0 ? (
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          {recents.map((video, index) => {
            return (
              <VideoCard
                key={video.id}
                details={{
                  title: video.title,
                  linkUrl: `/categories/${video.category}/${video.id}`,
                  videoUrl: video.video_url,
                  views: video.views,
                  addedDate: video.addedDate,
                }}
              />
            );
          })}
        </div>
      ) : (
        <NotExists name="recent uploads" />
      )}
    </div>
  );
};

export default Live;
