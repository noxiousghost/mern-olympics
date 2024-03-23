import React, { useEffect, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ user, setUser, setMessage, handleSearchKey }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  useEffect(() => {
    if (path.match("panel")) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [path]);

  const lightText =
    "block py-2 pr-4 pl-3 text-red bg-primary-700 rounded md:bg-transparent md:text-primary-600 md:p-0 dark:text-red";
  const normalText =
    "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-surface-500 dark:hover:text-primary-200 md:dark:hover:bg-yellow-700 dark:border-surface-400";

  return (
    <div
      onClick={() => setShowDropdown(false)}
      className={`${showNavbar ? "block mb-14" : "hidden mb-0"}  left-0 dark`}
    >
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-surface-600 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-primary-600">
        <div className="container space-y-3 sm:space-y-0 flex flex-wrap sm:flex-nowrap sm:flex-row w-full justify-around md:justify-between items-center mx-auto">
          <Link to="/" className="flex items-center ">
            <img
              src="/olympics.png"
              className="mr-3 h-6 sm:h-9"
              alt="Olympics Logo"
            />
            <span className="self-center text-base md:text-xl font-semibold whitespace-nowrap dark:text-white">
              FunOlympics
            </span>
          </Link>

          <div className="flex flex-row md:order-2 left-0 space-x-2">
            {user !== null ? (
              <>
                <button
                  className="flex text-sm p-1 bg-surface-600 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-surface-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-9 h-auto rounded-full"
                    src="/assets/profile-img/profile-1.png"
                    alt="user-img"
                  />
                </button>
                <div
                  className={`${
                    showUserMenu ? "block" : "hidden"
                  } absolute right-16 top-16 md:right-5 w-52 md:top-14 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-surface-500 dark:divide-surface-400`}
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.username}
                    </span>
                    <span className="block text-sm font-medium text-gray-300 truncate dark:text-gray-200">
                      {user.email}
                    </span>
                  </div>

                  <div className="w-full py-1 text-gray-900 bg-white border border-gray-200 dark:bg-surface-500 dark:border-surface-400 dark:text-white">
                    <Link
                      to="/profile"
                      className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:border-surface-400 dark:hover:bg-surface-400 dark:hover:text-white dark:focus:ring-surface-400 dark:focus:text-white"
                    >
                      <CgProfile className="mr-2 w-4 h-4 fill-current" />
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/panel"
                        className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:border-surface-400 dark:hover:bg-surface-400 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                      >
                        <svg
                          aria-hidden="true"
                          className="mr-2 w-4 h-4 fill-current"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                        </svg>
                        Admin Panel
                      </Link>
                    )}

                    <Link
                      to="/favourites"
                      className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:border-surface-400 dark:hover:bg-surface-400 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                    >
                      <AiOutlineStar className="mr-2 w-4 h-4 fill-current" />
                      Favourites
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setUser(null);
                        window.localStorage.clear();
                        setMessage({
                          message: "Logout successfully",
                          className: "success",
                        });
                        navigate("/");
                      }}
                      className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:border-surface-400 dark:hover:bg-surface-400 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                    >
                      <BiLogOut className="mr-2 w-4 h-4 fill-current" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  className="text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-yellow-400 lg:font-semibold rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                  onClick={() => {
                    setShowLoginMenu(!showLoginMenu);
                  }}
                >
                  Get started
                </button>

                <div
                  className={`${
                    showLoginMenu ? "block" : "hidden"
                  } absolute w-24 right-28 top-16 md:right-4 md:top-16 text-base list-none w bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-surface-500 dark:divide-surface-400`}
                  onClick={() => {
                    setShowLoginMenu(false);
                  }}
                >
                  <ul className="py-1 w-full">
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-surface-400 dark:text-gray-200 dark:hover:text-white"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-surface-400 dark:text-gray-200 dark:hover:text-white"
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <button
              className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-200 dark:hover:bg-surface-500 dark:focus:ring-surface-400"
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
            >
              <BiSearch className="w-5 h-5 text-gray-300" />
              <span className="sr-only">Search icon</span>
            </button>

            <button
              className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-200 dark:hover:bg-surface-500 dark:focus:ring-surface-400"
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <BiMenu className="w-7 h-7" />
            </button>
          </div>
          <div
            className={`${
              showMenu ? "block" : "hidden"
            }  justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <div className={`relative block mt-4 mx-2 md:mt-0 order-2`}>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <BiSearch className="w-5 h-5 text-gray-300" />
              </div>
              <input
                type="text"
                onChange={handleSearchKey}
                onFocus={() => {
                  navigate("/search");
                }}
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-surface-500 dark:surface-surface-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search..."
              />
            </div>
            <ul
              className="flex flex-col p-4 mt-4 mx-2 order-1 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-surface-500 md:dark:bg-surface-600 dark:border-surface-400"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <li>
                <Link
                  to="/"
                  className={path === "/" ? lightText : normalText}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className={path === "/news" ? lightText : normalText}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/tablepoint"
                  className={path === "/tablepoint" ? lightText : normalText}
                >
                  Medal Table
                </Link>
              </li>
              <li>
                <Link
                  to="/players"
                  className={path === "/players" ? lightText : normalText}
                >
                  Players
                </Link>
              </li>

              {/* <li>
                <Link
                  to="/fixtures"
                  className={path === "/fixtures" ? lightText : normalText}
                >
                  Fixtures & Results
                </Link>
              </li> */}

              <li
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onClick={() => setShowDropdown(false)}
              >
                <div
                  className={
                    path.includes("/fixtures") ? lightText : normalText
                  }
                >
                  Fixtures & Results
                  {showDropdown && (
                    <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl dark:bg-surface-500">
                      <Link
                        to="/fixtures/football"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-surface-400 dark:text-gray-200 dark:hover:text-white"
                        onClick={() => setShowDropdown(false)}
                      >
                        Football
                      </Link>
                      <Link
                        to="/fixtures/others"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-surface-400 dark:text-gray-200 dark:hover:text-white"
                        onClick={() => setShowDropdown(false)}
                      >
                        Other Sports
                      </Link>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link
                  to="/categories"
                  className={path === "/categories" ? lightText : normalText}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/lives"
                  className={path === "/lives" ? lightText : normalText}
                >
                  Live
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
