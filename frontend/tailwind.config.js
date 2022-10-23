/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#04D49C",
        orange: "#FFBC30",
        darkBlue: "rgba(4, 37, 52, 1)",
        gray: "rgba(224, 231, 240, 1)",
      },
      fontFamily: {
        sans: ["Avenir Next", "Helvetica", "Arial", "sans-serif"],
        roboto: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "splash-pattern": "url('images/splash.png')",
      },
    },
  },
  plugins: [],
};
