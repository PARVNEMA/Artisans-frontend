/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				one: "#D7CEC7",
				two: "#565656",
				three: "#FF9933",
				four: "#C09F980",
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
				one: "#D7CEC7",
				two: "#565656",
				three: "#76323F",
				four: "#C09F80",
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
