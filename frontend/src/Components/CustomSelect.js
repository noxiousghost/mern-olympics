import React, { useState } from "react";
import Select from "react-select";
import { useField } from "formik";

function CustomSelect(props) {
  const [field, meta] = useField(props.name);
  const [showError, setShowError] = useState(false);
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
  return (
    <>
      <Select
        {...field}
        {...props}
        isClearable
        isSearchable
        styles={customSelectStyles}
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
}

export default CustomSelect;
