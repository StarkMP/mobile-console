/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "rgb(13, 34, 71)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    container: {
      center: true,
      screens: {
        lg: "880px",
        xl: "880px",
        "2xl": "880px",
      },
    },
  },
  plugins: [],
};
