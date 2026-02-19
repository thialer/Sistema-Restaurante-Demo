/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/Sistema-Restaurante-Demo/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
