import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../../Components/Aside";
import { create } from "../../../../services/video";
import { Formik } from "formik";
import TextField from "../../../../Components/TextField";
import TextArea from "../../../../Components/TextArea";
import { getAllCategories } from "../../../../services/category";

const AddVideo = ({ setMessage }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
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

  let initial = {
    title: "",
    description: "",
    video: "",
    category_id: "",
  };

  return (
    <div className="flex flex-row h-full md:h-screen bg-gray-50 dark:bg-surface-600 ">
      <Aside />
      <main className=" px-6 flex-grow h-full md:h-auto">
        <Formik
          initialValues={initial}
          onSubmit={async (data, { resetForm }) => {
            if (data.category_id === "") {
              setMessage({
                message: `Please choose a category!!`,
                className: "warning",
              });
            } else {
              let newdata = new FormData();
              newdata.append("video", data.video);
              newdata.append("title", data.title);
              newdata.append("description", data.description);
              newdata.append("category_id", data.category_id);
              try {
                const response = await create(newdata);
                if (response) {
                  setMessage({
                    message: "Video added..",
                    className: "success",
                  });
                  navigate(-1);
                }
              } catch (error) {
                setMessage({
                  message: `${error.response.data.error || error.message}`,
                  className: "warning",
                });
              }
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, values, setFieldValue }) => {
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="relative bg-white rounded-lg shadow dark:bg-surface-500"
              >
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-surface-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Video
                  </h3>
                  <div
                    className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6 ">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <TextField
                        type="text"
                        name="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Enter title here..."
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        name="category_id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-surface-400 dark:border-surface-300 dark:placeholder-gray-200 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        onChange={(event) =>
                          setFieldValue("category_id", event.target.value)
                        }
                        required
                        defaultValue={"DEFAULT"}
                      >
                        <option
                          value="DEFAULT"
                          disabled
                          className="text-gray-300"
                        >
                          Choose a category ...
                        </option>
                        {/* <option value="" selected disabled>
                          Select Category
                        </option> */}
                        {categories.length > 0 ? (
                          categories.map((category, index) => {
                            return (
                              <option key={index} value={category.id}>
                                {category.title}
                              </option>
                            );
                          })
                        ) : (
                          <option value="" disabled className="text-wheatt">
                            No categories available!!
                          </option>
                        )}
                        {/* type="text"
                        name="category_id"
                        // value={user.title || ""}
                        // onChange={handleInputChange}
                        value={0}
                        disabled
                        placeholder="Select category" */}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <TextArea
                        rows={10}
                        type="text"
                        name="description"
                        placeholder="Enter description here...."
                        required
                        // value={values.description}
                        // className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        // onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Video
                      </label>
                      <input
                        type="file"
                        name="video"
                        onChange={(event) =>
                          setFieldValue("video", event.target.files[0])
                        }
                        required
                        // onClick={handleChange('video')}
                        // onChange={(e) => {
                        //   e.preventDefault();
                        //   setFieldValue("video", e.target.files[0]);
                        // }}
                        // required
                      />

                      {/* <img
                        className="w-full max-h-fit shadow-sm bg-gray-50 border p-2 rounded-md border-gray-300 text-gray-900 sm:text-sm  focus:ring-pink-600 focus:border-pink-600   dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        src={category.video}
                        alt=""
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-surface-400">
                  <button
                    type="submit"
                    className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                  >
                    Add
                  </button>
                  <div
                    className="text-white bg-surface-400 cursor-pointer hover:bg-surface-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-surface-300 dark:hover:bg-surface-200 dark:focus:ring-gray-300"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
};

export default AddVideo;
