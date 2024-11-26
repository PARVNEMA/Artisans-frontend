/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#3E362E",
        two: "#865D36",
        three: "#93785B",
        four: "#F9F2EA",
        five: "#A69080",
      },
      fontFamily: {
        sans: ["Cambria", "Roboto"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "black",
      "wireframe",
      "autumn",
      "forest",
      "cupcake",
      "luxury",
    ],
  },
};
