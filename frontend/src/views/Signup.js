import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../Components/TextField";
import { signupValidationSchema } from "../FormValidation/validationSchema";
import { signup } from "../services/loginSignup";

const Signup = ({ setMessage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-8 ">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400 ">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (data, { resetForm }) => {
            try {
              const response = await signup(data);
              if (response) {
                resetForm({});
                setMessage({
                  message: `Welcome ${response.username}. Please verify your email and continue!`,
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
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign up to Fun Olympics 2024
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
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your Email
                  </label>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your Password
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
                  className="w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-600 dark:focus:ring-yellow-400"
                >
                  Sign up
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
