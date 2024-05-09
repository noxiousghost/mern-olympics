import React from "react";
import { IoMdFootball, IoMdBasketball, IoMdSnow } from "react-icons/io";
import {
  MdGolfCourse,
  MdOutlineSportsTennis,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import { FaRunning, FaTableTennis, FaSkiing, FaSwimmer } from "react-icons/fa";
import { GiArcher } from "react-icons/gi";
import CustomSelect from "./CustomSelect";
import { useField } from "formik";

function SportSelector(props, values) {
  const [field, meta] = useField(props.name);
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
  return (
    <>
      <CustomSelect
        {...field}
        {...props}
        options={sportsOptions}
        value={sportsOptions.find(
          (option) => option.value === values.favoriteSport
        )}
        getOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={option.icon} alt="" style={{ marginRight: 10 }} />
            {option.label}
          </div>
        )}
      />
    </>
  );
}

export default SportSelector;
