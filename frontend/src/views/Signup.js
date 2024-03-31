import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Select from "react-select";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";
import emojiFlag from "emoji-flag";
import TextField from "../Components/TextField";
import { signupValidationSchema } from "../FormValidation/validationSchema";
import { signup } from "../services/loginSignup";
import { IoMdFootball, IoMdBasketball, IoMdSnow } from "react-icons/io";
import {
  MdGolfCourse,
  MdOutlineSportsTennis,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import { FaRunning, FaTableTennis, FaSkiing, FaSwimmer } from "react-icons/fa";
import { GiArcher } from "react-icons/gi";

const sportsOptions = [
  {
    value: "athletics",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaRunning style={{ marginLeft: -10, marginRight: 10 }} /> Athletics
      </div>
    ),
  },
  {
    value: "swimming",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaSwimmer
          style={{ marginLeft: -10, marginRight: 10, color: "blue" }}
        />{" "}
        Swimming
      </div>
    ),
  },
  {
    value: "basketball",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <IoMdBasketball
          style={{ marginLeft: -10, marginRight: 10, color: "orange" }}
        />{" "}
        Basketball
      </div>
    ),
  },
  {
    value: "football",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <IoMdFootball
          style={{ marginLeft: -10, marginRight: 10, color: "white" }}
        />{" "}
        Football
      </div>
    ),
  },
  {
    value: "tableTennis",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaTableTennis
          style={{ marginLeft: -10, marginRight: 10, color: "purple" }}
        />{" "}
        Table Tennis
      </div>
    ),
  },
  {
    value: "skiing",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaSkiing
          style={{ marginLeft: -10, marginRight: 10, color: "skyblue" }}
        />{" "}
        Skiing
      </div>
    ),
  },
  {
    value: "tennis",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdOutlineSportsTennis
          style={{ marginLeft: -10, marginRight: 10, color: "yellowgreen" }}
        />{" "}
        Tennis
      </div>
    ),
  },
  {
    value: "archery",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <GiArcher
          style={{ marginLeft: -10, marginRight: 10, color: "lightblue" }}
        />{" "}
        Archery
      </div>
    ),
  },
  {
    value: "golf",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdGolfCourse
          style={{ marginLeft: -10, marginRight: 10, color: "darkgreen" }}
        />{" "}
        Golf
      </div>
    ),
  },
  {
    value: "baseball",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdOutlineSportsBaseball
          style={{ marginLeft: -10, marginRight: 10, color: "red" }}
        />{" "}
        Baseball
      </div>
    ),
  },
];

countries.registerLocale(englishCountries);

const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  value: code,
  label: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: 10 }}>{emojiFlag(code)}</span>
      {name}
    </div>
  ),
}));

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#3f3f3f",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    boxShadow: state.isFocused ? 0 : 0,
    borderColor: state.isFocused ? "#ffc83b" : "#6b7280",
    "&:hover": {
      borderColor: state.isFocused ? "#ffc83b" : "#6b7280",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    backgroundColor: "575757",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
    "& input": {
      font: "inherit",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#d1d5db",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isFocused ? "#7d5e01" : "#575757",
  }),
};

const Signup = ({ setMessage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            country: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await signup(values);
              if (response) {
                resetForm({});
                setMessage({
                  message: `Welcome ${response.username}. Please verify your account`,
                  className: "success",
                });
                window.localStorage.setItem(
                  "signupEmail",
                  JSON.stringify(response.email)
                );
                navigate("/verify");
              }
            } catch (error) {
              setMessage({
                message: `${error.response.data.error}`,
                className: "warning",
              });
            }
          }}
          validationSchema={signupValidationSchema}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            handleBlur,
          }) => (
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create an account
              </h5>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Full Name
                </label>
                <TextField
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Country
                </label>
                <Select
                  options={countryOptions}
                  isClearable
                  isSearchable
                  name="country"
                  placeholder="Select your country"
                  styles={customSelectStyles}
                  onChange={(selectedOption) =>
                    setFieldValue(
                      "country",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={handleBlur}
                  value={countryOptions.find(
                    (option) => option.value === values.country
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="favoriteSport"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Favorite Olympic Sport
                </label>
                <Select
                  options={sportsOptions}
                  isClearable
                  isSearchable
                  styles={customSelectStyles}
                  name="favoriteSport"
                  placeholder="Select your favorite sport"
                  className="text-base"
                  onChange={(selectedOption) =>
                    setFieldValue(
                      "favoriteSport",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={handleBlur}
                  value={sportsOptions.find(
                    (option) => option.value === values.favoriteSport
                  )}
                  getOptionLabel={(option) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={option.icon}
                        alt=""
                        style={{ marginRight: 10 }}
                      />
                      {option.label}
                    </div>
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email Address
                </label>
                <TextField
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <TextField
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <TextField
                  type="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <TextField
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
              >
                Register
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary-600 hover:underline dark:text-primary-500"
                >
                  &nbsp;Login
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
