import React, { useState } from "react";
import { useField } from "formik";

const TextField = (props) => {
  const [field, meta] = useField(props.name);

  const [showError, setShowError] = useState(false);

  return (
    <>
      <input
        {...field}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white"
        onFocus={(e) => {
          e.preventDefault();
          setShowError(true);
        }}
      />
      <span className={`text-red-500 ${showError ? "block" : "hidden"}`}>
        {meta.error}
      </span>
    </>
  );
};

export default TextField;
