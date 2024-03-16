import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../Components/TextField";
import { loginValidationSchema } from "../FormValidation/validationSchema";
import { login } from "../services/loginSignup";
import { setToken } from "../services/token";

const Login = ({ setUser, setMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-surface-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (data, { resetForm }) => {
            try {
              const response = await login(data);
              if (response) {
                setUser(response);
                resetForm({});
                const user = JSON.stringify(response);
                window.localStorage.setItem("loggedInOlympicsUser", user);
                setToken(response.token);
                navigate("/");
                setMessage({
                  message: "Login successfully",
                  className: "success",
                });
              }
            } catch (error) {
              setMessage({
                message: `${error.response.data.error}`,
                className: "error",
              });
            }
          }}
          validationSchema={loginValidationSchema}
        >
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h5>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your password
                  </label>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-50 rounded border text-primary-600 border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-surface-500 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forget"
                    className="ml-auto text-sm text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-primary-600 hover:underline dark:text-primary-500"
                  >
                    &nbsp;Signup
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

export default Login;
