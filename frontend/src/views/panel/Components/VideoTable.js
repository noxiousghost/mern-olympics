import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteVideo, getAll } from "../../../services/video";
import ReactPlayer from "react-player";

const VideoTable = ({ setMessage }) => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();
  const fetchVideo = async () => {
    try {
      const fetchedVideos = await getAll();
      setVideos(fetchedVideos);
      setFiltered(fetchedVideos);
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "error",
      });
    }
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  useEffect(() => {
    const result = videos.filter((video) =>
      video.title.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  createTheme(
    "solarized",
    {
      text: {
        // primary: "#268bd2",
        primary: "#f0f2f5",

        secondary: "#bf125d",
      },
      background: {
        // default: "#002b36",
        default: "#282828",
      },
      context: {
        background: "#bf125d",
        text: "#FFFFFF",
      },
      divider: {
        default: "#f792be",
      },
      selected: {
        default: "#301723",
        text: "rgba(255, 255, 255, 1)",
      },
      highlightOnHover: {
        default: "#2e1f26",
        text: "rgba(255, 255, 255, 1)",
      },
      striped: {
        default: "#FAFAFA",
        text: "rgba(0, 0, 0, 0.87)",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Category",
      selector: (row) => row.category.title,
      sortable: true,
    },
    {
      name: "Video",
      cell: (row) => (
        <div>
          <ReactPlayer
            width={100}
            height={100}
            url={row.video_url}
            controls={false}
          />
        </div>
      ),
    },
    {
      name: "Views",
      selector: (row) => row.views,
      sortable: true,
    },
    {
      name: "Uploaded by",
      selector: (row) => row.uploader.username,
    },
    {
      name: "Upload date",
      selector: (row) => row.addedDate,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigate(`/panel/videos/edit/${row.id}`);
            }}
          >
            <FaEdit className="w-6 h-6 fill-pink-800 hover:fill-pink-600" />
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${row.title.substr(
                    0,
                    10
                  )}...?`
                )
              ) {
                handleDelete(row.id);
              }
            }}
          >
            <MdDeleteOutline className="w-7 h-7 fill-red-600 hover:fill-red-500" />
          </button>
        </div>
      ),
    },
    // {
    //   name:"Img",
    //   selector:(row)=><img width={50} height={50} src={row.img} alt=""/>
    // }
  ];
  const handleDelete = async (id) => {
    try {
      await deleteVideo(id);
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
      setFiltered(updatedVideos);
      setMessage({
        message: "Video deleted successfully.",
        className: "success",
      });
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "error",
      });
    }
  };
  return (
    <DataTable
      title="Video List"
      columns={columns}
      data={filtered}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <button
          onClick={() => navigate("/panel/videos/add")}
          className=" text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          Add
        </button>
      }
      subHeader
      subHeaderComponent={
        <input
          type="text"
          className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-surface-400 dark:border-surface-300 dark:placeholder-gray-300 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
          placeholder="Search Videos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
      responsive
      theme="solarized"
      onRowClicked={(row) => {
        navigate(`/categories/${row.category.id}/${row.id}`);
      }}
    />
  );
};

export default VideoTable;
