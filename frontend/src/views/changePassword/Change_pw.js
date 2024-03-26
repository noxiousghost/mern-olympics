import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../Components/TextField";
import { changePasswordValidationSchema } from "../../FormValidation/validationSchema";
import { new_password } from "../../services/changePassword";

const Change_pw = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const email = window.localStorage.getItem("ChangePasswordEmail");
    if (!email) {
      setMessage({
        message: `Please provide your email!`,
        className: "warning",
      });
      navigate("/forget");
    } else {
      setEmail(email);
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
        <Formik
          enableReinitialize
          initialValues={{
            email: email || "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (data, { resetForm }) => {
            try {
              const credentials = {
                email: data.email,
                password: data.password,
              };
              const response = await new_password(credentials);
              if (response) {
                resetForm({});
                window.localStorage.removeItem("ChangePasswordEmail");
                navigate("/login");
                setMessage({
                  message: "Password changed successfully",
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
          validationSchema={changePasswordValidationSchema}
        >
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Reset your password
                </h5>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your Email Address
                  </label>
                  <TextField
                    type="email"
                    name="email"
                    value={values.email}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New password
                  </label>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Confirm new password
                  </label>
                  <TextField
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                >
                  Change password
                </button>
                {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Remember password?
                  <Link
                    to="/login"
                    className="text-yellow-300 hover:underline dark:text-yellow-300"
                  >
                    Login
                  </Link>
                </div> */}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Change_pw;
