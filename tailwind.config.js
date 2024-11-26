/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#25362c",// background
        two: "#FFB000",// boader and headline
        three: "#F5F5DC",// cream color on  button and such
        four: "#F5F5DC",// fully background
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
