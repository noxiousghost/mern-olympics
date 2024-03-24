/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

    colors: {
      blackk: "#1D2639",
      grayy: "#465975",
      lightgrayy: "#7B8CA6",
      wheatt: "white",
      primary: {
        600: "#ffc107",
        500: "#ffc83b",
        400: "#ffce58",
        300: "#ffd572",
        200: "#ffdc8a",
        100: "#ffe3a2",
      },
      surface: {
        600: "#121212",
        500: "#282828",
        400: "#3f3f3f",
        300: "#575757",
        200: "#717171",
        100: "#8b8b8b",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
};
