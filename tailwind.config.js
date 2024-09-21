/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: "#cb3837",
        customGray: "#24292e",
        customLightGray: "#f4f4f4",
        customDarkGray: "#2f363d",
      },
      backgroundImage: {
        "custom-image": 'url("/src/assets/bg-image.png")',
      },
    },
  },
  plugins: [],
};
