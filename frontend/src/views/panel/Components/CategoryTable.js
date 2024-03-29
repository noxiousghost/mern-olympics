import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../../services/category";

const CategoryTable = ({ setMessage }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
      setFiltered(fetchedCategories);
    } catch (error) {
      setMessage({
        message: `${error.response.data.error || error.message}`,
        className: "error",
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    const result = categories.filter((category) =>
      category.title.toLowerCase().match(search.toLowerCase())
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
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    // },
    {
      name: "Image",
      cell: (row) => <img src={row.image} alt="" width={100} height={100} />,
    },
    {
      name: "Videos",
      selector: (row) => row.videos.length,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigate(`/panel/categories/edit/${row.id}`);
            }}
          >
            <FaEdit className="w-6 h-6 fill-pink-800 hover:fill-pink-600" />
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "All of the videos in this category will automatically be deleted! Would you really want to delete this category?"
                )
              ) {
                handleDelete(row.id);
              }
            }}
          >
            <MdDeleteOutline className="w-7 h-7 fill-red-800 hover:fill-red-600" />
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
      await deleteCategory(id);
      const updatedVideos = categories.filter((category) => category.id !== id);
      setCategories(updatedVideos);
      setFiltered(updatedVideos);
      setMessage({
        message: "Category and videos deleted successfully.",
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
      title="Category List"
      columns={columns}
      data={filtered}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="580px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <button
          onClick={() => navigate("/panel/categories/add")}
          className=" text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          Add
        </button>
      }
      subHeader
      subHeaderComponent={
        <input
          type="text"
          className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-surface-400 dark:border-surface-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
          placeholder="Search Sports"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
      responsive
      theme="solarized"
      onRowClicked={(row) => {
        navigate(`/categories/${row.id}`);
      }}
    />
  );
};

export default CategoryTable;
