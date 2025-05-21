/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { max: "900px" },
        md: { min: "901px", max: "1024px" },
        lg: "1025px",
      },
    },
  },
  plugins: [],
};
