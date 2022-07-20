/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jobssy: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        primary: "#0D0630",
        secondary: "#18314F",
        "jobssy-blue": "#384E77",
        "jobssy-green": "#8BBEB2",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
