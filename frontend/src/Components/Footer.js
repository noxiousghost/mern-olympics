import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-surface-400 lg:mt-8" />
      <div className="sm:flex sm:items-center sm:justify-center mb-4">
        <Link to="/" className="flex items-center mb-4 sm:mb-0">
          <img src="/olympics.png" className="mr-3 h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Olympics
          </span>{" "}
          &nbsp; &nbsp;
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
              About us
            </Link>
          </li>
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024&nbsp;
        <Link to="/" className="hover:underline">
          Fun Olympics
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
