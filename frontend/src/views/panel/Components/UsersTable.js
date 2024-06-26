import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../services/users";
import { Checkbox } from "flowbite-react";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";

countries.registerLocale(englishCountries);

const UsersTable = ({ setMessage }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAll();
      setUsers(fetchedUsers);
      setFiltered(fetchedUsers);
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "error",
      });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const result = users.filter((user, index) =>
      user.username.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search]);

  createTheme(
    "solarized",
    {
      text: {
        // primary: "#268bd2",
        primary: "#f0f2f5",

        secondary: "#bf125d",
      },
      background: {
        // default: "#002b36",
        default: "#282828",
      },
      context: {
        background: "#bf125d",
        text: "#FFFFFF",
      },
      divider: {
        default: "#f792be",
      },
      selected: {
        default: "#301723",
        text: "rgba(255, 255, 255, 1)",
      },
      highlightOnHover: {
        default: "#2e1f26",
        text: "rgba(255, 255, 255, 1)",
      },
      striped: {
        default: "#FAFAFA",
        text: "rgba(0, 0, 0, 0.87)",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const customStyles = {};

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Role",
      selector: (row) => (row.isAdmin ? "admin" : "user"),
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => countries.getName(row.country, "en"),
      sortable: true,
    },
    {
      name: "Sport",
      selector: (row) => row.favoriteSport,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.verified ? "verified" : "not verified"),
      // when: row => row.verified,
      // style: (row) => ({
      //   backgroundColor: row.verified ? "red" : "inherit",
      //   // color: 'white',
      //   "&:hover": {
      //     cursor: "pointer",
      //   },
      // }),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              navigate(`/panel/users/edit/${row.id}`);
            }}
          >
            <FaEdit className="w-6 h-6 fill-pink-800 hover:fill-pink-600" />
          </button>
          {/* <button>
            <MdDeleteOutline className="w-7 h-7 fill-red-800 hover:fill-red-600" />
          </button> */}
        </div>
      ),
    },
    // {
    //   name:"Img",
    //   selector:(row)=><img width={50} height={50} src={row.img} alt=""/>
    // }
  ];
  return (
    <DataTable
      title="User List"
      customStyles={customStyles}
      columns={columns}
      data={filtered}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="580px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      // actions={<button className="p-2  rounded-md bg-grayy">Export</button>}
      subHeader
      subHeaderComponent={
        <input
          type="text"
          className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-surface-400 dark:border-surface-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="right"
      responsive
      theme="solarized"
      onRowClicked={(row) => {
        navigate(`/panel/users/${row.id}`);
      }}
    />
  );
};

export default UsersTable;
