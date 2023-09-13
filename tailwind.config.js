/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        "console-error": "rgb(255, 0, 0)",
        "console-info": "rgb(32, 33, 36)",
        "console-warn": "rgb(92, 60, 0)",
        "console-background-error": "rgb(255, 240, 240)",
        "console-background-info": "transparent",
        "console-background-warn": "rgb(255, 251, 230)",
        "console-border-error": "rgb(255, 214, 214)",
        "console-border-info": "rgb(243, 244, 246)",
        "console-border-warn": "rgb(255, 245, 194)",
      },
    },
    container: {},
  },
  plugins: [],
};
