import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";

countries.registerLocale(englishCountries);
const Profile = ({ user }) => {
  const navigate = useNavigate();

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
    }
  }, []);

  console.log(user);

  return (
    <>
      <div className="h-full bg-gray-50 dark:bg-surface-600 py-10">
        <div className="border-b-2 border-b-gray-700  flex flex-col space-y-4 md:space-y-0 md:flex-row   ">
          {/* p-4 w-full max-w-sm  rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400 */}
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 rounded-lg dark:bg-surface-500 dark:border-surface-400 shadow-md">
            <div className="flex justify-between  ">
              <span className="text-xl font-semibold block">Profile</span>
              <button className="-mt-2 text-md font-bold text-white bg-yellow-400 rounded-full px-5 py-2 hover:bg-yellow-500">
                Edit
              </button>
            </div>

            <span className="text-gray-200">Your account information</span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src="/assets/profile-img/profile-1.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8  dark:bg-surface-500 rounded-lg dark:border-surface-400 lg:ml-4 shadow-md">
            <div className="rounded  shadow p-6">
              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-xl px-4 py-2 w-full  dark:bg-surface-500 dark:border-surface-400 "
                    type="text"
                    value={user ? user.username : ""}
                  />
                </div>
              </div>
              <div className="pb-6">
                <label
                  htmlFor="country"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300"
                >
                  Country
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="country"
                    className="border-1  rounded-xl px-4 py-2 w-full  dark:bg-surface-500 dark:border-surface-400 "
                    type="text"
                    value={
                      user && user.country
                        ? countries.getName(user.country, "en")
                        : "Not Selected"
                    }
                  />
                </div>
              </div>
              <div className="pb-6">
                <label
                  htmlFor="favoriteSport"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300"
                >
                  Favorite Sport
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="favoriteSport"
                    className="border-1  rounded-xl px-4 py-2 w-full  dark:bg-surface-500 dark:border-surface-400 "
                    type="text"
                    value={user ? user.favoriteSport : "Not Selected"}
                  />
                </div>
              </div>
              <div className="pb-6">
                <label
                  htmlFor="phone"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="phone"
                    className="border-1  rounded-xl px-4 py-2 w-full  dark:bg-surface-500 dark:border-surface-400 "
                    type="text"
                    value={user ? user.phone : "Error getting phone number"}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300  "
                >
                  Email
                </label>
                <input
                  disabled
                  id="email"
                  className="border-1  rounded-xl px-4 py-2 w-full dark:bg-surface-500 dark:border-surface-400"
                  type="email"
                  value={user ? user.email : ""}
                />
                <span className="text-gray-600 pt-4 block opacity-70 dark:text-gray-100">
                  Pyaris Fun Olypmic 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
