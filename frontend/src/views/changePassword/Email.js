import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { send_mail } from "../../services/changePassword";

const Email = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //   useEffect(()=>{
  //     window.localStorage.removeItem("ChangePasswordEmail");
  //   },[])

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage({ message: "Please enter your email!", className: "warning" });
    } else {
      try {
        const data = { email: email };
        const response = await send_mail(data);
        if (response) {
          window.localStorage.setItem("ChangePasswordEmail", email);
          navigate("/enter_otp");
          setMessage({
            message: "Otp sent successfully",
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
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-surface-500 dark:border-surface-400">
        <div className="bg-white dark:bg-surface-500 dark:border-surface-400 min-h-80 rounded-lg text-center">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Forget Password
          </h1>

          <div className="w-full items-center flex flex-col h-auto dark:text-blackk">
            <div className="flex flex-row justify-start w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
            </div>
            <input
              className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="email"
              placeholder="Enter email address here"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
            <button
              onClick={sendOtp}
              className="w-full text-white bg-primary-600 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500 px-5 py-2.5"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
