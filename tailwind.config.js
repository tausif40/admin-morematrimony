/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f21a2d",
        text: "#a8a9a9",
        textGray: "#303030",
        black: "#111723",
        hotRed: "#f21a2d",
        gold: "#f8c928",
      }
    },
  },
  plugins: [],
}