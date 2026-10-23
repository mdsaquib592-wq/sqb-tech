/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sqb: {
          dark: "#050811",
          card: "#0b1120",
          cyan: "#00d2ff",
          blue: "#0066ff",
          silver: "#e2e8f0",
        },
      },
    },
  },
  plugins: [],
};
