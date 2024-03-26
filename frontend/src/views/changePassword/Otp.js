import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { send_mail, verify_otp } from "../../services/changePassword";

const Otp = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
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
        const response = await verify_otp(data);
        if (response) {
          navigate("/change_password");
          setMessage({ message: "Otp Verified", className: "success" });
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
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
        <div className="bg-white dark:bg-surface-500 dark:border-surface-400 min-h-80 rounded-lg text-center">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Account
          </h1>
          <div className="mt-4 w-full items-center flex flex-col h-auto dark:text-blackk">
            <div className="flex flex-row justify-start w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email Address
              </label>
            </div>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="email"
              value={email}
              disabled
            />

            <div className="mt-2 flex flex-row justify-start w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                OTP Code
              </label>
            </div>
            <input
              className=" bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  block w-full p-2.5  dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="tel"
              maxLength="6"
              placeholder="Enter otp code here"
              onChange={(e) => {
                e.preventDefault();
                setCode(e.target.value);
              }}
            />
            <button
              onClick={verifyOTP}
              className="w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
            >
              Verify
            </button>
          </div>

          <div className="flex justify-center text-center mt-5">
            <div className="flex items-center text-yellow-300 hover:text-yellow-400 cursor-pointer">
              <button
                onClick={async () => {
                  try {
                    const data = { email: email };
                    const response = await send_mail(data);
                    if (response) {
                      window.localStorage.setItem("ChangePasswordEmail", email);
                      setMessage({
                        message: "OPT Sent Successfully",
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
                className="font-thin"
              >
                Resend OTP
              </button>
              <i className="bx bx-caret-right ml-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
