/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
