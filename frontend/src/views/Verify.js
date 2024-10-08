import React, { useEffect, useState } from "react";
import { verify } from "../services/loginSignup";
import { useNavigate } from "react-router-dom";

const Verify = ({ setMessage }) => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const email = window.localStorage.getItem("signupEmail");

    if (!email) {
      navigate("/signup");
      setMessage({
        message: `Please signup to get otp!`,
        className: "warning",
      });
    } else {
      const em = JSON.parse(email);
      setEmail(em);
    }
  }, []);

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (code === "") {
      setMessage({
        message: "Please enter the OPT code!",
        className: "warning",
      });
    } else {
      const data = {
        email: email,
        code: parseInt(code),
      };
      try {
        const response = await verify(data);
        if (response) {
          window.localStorage.removeItem("signupEmail");
          navigate("/login");
          setMessage({
            message: "Account Verified",
            className: "success",
          });
        }
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center py-8">
        <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
          <div className="bg-white dark:bg-surface-500 dark:border-surface-400 min-h-80 rounded-lg text-center">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Account Verification
            </h1>

            <div className=" w-full items-center flex flex-col h-auto dark:text-blackk">
              <div className="flex flex-row justify-start w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Enter verification code sent to your Email
                </label>
              </div>
              <input
                className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-surface-500 dark:border-surface-400 dark:placeholder-gray-400 dark:text-white"
                type="tel"
                maxLength="6"
                placeholder="123456"
                onChange={(e) => {
                  e.preventDefault();
                  setCode(e.target.value);
                }}
              />
              <button
                onClick={verifyOTP}
                className="w-full text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
              >
                Verify
              </button>
            </div>
            <div className="flex justify-center text-center mt-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
