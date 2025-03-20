/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Customize primary color
        secondary: "#3B82F6", // Customize secondary color
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Optional: for better form styling
  ],
};
