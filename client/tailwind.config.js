/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            'jobssy': ['Source Sans Pro', 'sans-serif']
        }
    },
  },
  plugins: [],
}
