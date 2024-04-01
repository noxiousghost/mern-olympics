import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ResponsivePlayer from "../../Components/ResponsivePlayer";
import VideoCard from "../../Components/VideoCard";
import { getAll, getOne } from "../../services/video";
import Moment from "react-moment";
import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { addToFav, getOne as getOneUser } from "../../services/users";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
const VideoPlayer = ({ user, setMessage }) => {
  const [comment, setComment] = useState(""); // State to hold the comment
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState({});
  const [played, setPlayed] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let loggedUser = null;
    if (user !== null) {
      loggedUser = user;
    } else {
      const localUser = window.localStorage.getItem("loggedInOlympicsUser");
      loggedUser = JSON.parse(localUser);
    }

    if (loggedUser === null) {
      setMessage({
        message: "Must login to watch videos!!",
        className: "warning",
      });
      navigate("/login");
    } else {
      const fetchVideo = async (id) => {
        try {
          const getUser = await getOneUser(loggedUser.id);
          if (getUser) {
            const userFav = getUser.favourites;
            const exists = userFav.some(
              (fav) => fav.id.toString() === id.toString()
            );
            if (exists) {
              setFav(true);
            }
          }
          const fetchedVideo = await getOne(id);
          const allVideo = await getAll();
          setVideo(fetchedVideo);
          const filtered = allVideo.filter((v) => v.id !== id);
          setRelated(filtered);
          setIsLoading(false);
        } catch (error) {
          setMessage({
            message: `${error.response.data.error}`,
            className: "warning",
          });
        }
      };
      fetchVideo(id);
    }
  }, [id]);
  // Function to handle comment submission
  const handleCommentSubmit = () => {
    // Add the new comment to the comments state
    setComments([...comments, comment]);
    // Clear the comment input field after submission
    setComment("");
  };

  // useEffect(() => {
  //   // title can be the fetched video title
  //   return () => {
  //     // save user's watch time

  //     // console.log(played);
  //     // console.log("Component unmount");
  //   };
  // }, [played]);

  const handleWatchTime = (state) => {
    // console.log(state);
    setPlayed(state.playedSeconds);
  };

  const handleFavourites = async () => {
    setFav(!fav);

    try {
      const response = await addToFav(id);
      if (response) {
        setMessage({
          message: response.message,
          className: "success",
        });
      }
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "warning",
      });
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ResponsivePlayer
              url={video.video_url}
              onProgress={handleWatchTime}
            />
            <div className="text-gray-700 dark:text-gray-400 py-2 md:my-2 flex flex-col space-y-1">
              <span className="text-wheatt text-sm md:text-3xl font-bold">
                {video.title}
              </span>

              <div className="p-2 flex flex-row justify-between">
                <div>
                  {video.views} views *{" "}
                  <Moment fromNow>{video.addedDate}</Moment>
                  <span className="pl-5">
                    Uploaded by {video.uploader.username}
                  </span>
                  <span className="pl-5">Played:{played} </span>
                </div>
                <div
                  className="flex flex-row justify-end space-x-3 item-center cursor-pointer "
                  onClick={handleFavourites}
                >
                  <div className="w-auto h-full">
                    {fav ? (
                      <BsFillStarFill className="w-6 h-6 text-primary-600" />
                    ) : (
                      <AiOutlineStar className="w-7 h-7" />
                    )}
                  </div>{" "}
                  <div>
                    {fav ? (
                      <span className="p-1">Added to favourites</span>
                    ) : (
                      <span className="p-1">Add to favourites</span>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="pb-2.5 flex flex-col">
                <span className="text-wheatt text-lg my-2">Description</span>
                <span className="leading-3 whitespace-pre-line">
                  {" "}
                  {video.description}
                </span>
              </div>
            </div>
          </>
        )}
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
        <div className="my-6">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Related Videos
          </span>
          <hr className=" mt-4 h-1" />
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
            {related.map((video, index) => {
              return (
                <VideoCard
                  key={index}
                  details={{
                    title: video.title,
                    linkUrl: `/categories/${video.category.id}/${video.id}`,
                    videoUrl: video.video_url,
                    views: video.views,
                    addedDate: video.addedDate,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <NotExists name="related videos" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
