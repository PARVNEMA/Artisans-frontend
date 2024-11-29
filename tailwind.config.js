/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				one: "#0C084C", // background
				two: "#F0EEC8", // boader and headline
				three: "#00B7A8", // cream color on  button and such
				four: "#F0EEC8", // fully background
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
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#25362c",// background
        two: "#FFB000",// boader and headline
        three: "#FFF8E8",// cream color on  button and such
        four: "#FCF8F3",// fully background
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
