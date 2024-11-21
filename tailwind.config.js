/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			one: "#3E362E",
			two: "#865D36",
			three: "#93785B",
			four: "#F9F2EA",
			five: "#A69080",
			white: "#FFFFFF",
			black: "#000000",
		},
	},
	plugins: [daisyui],
	fontFamily: {
		sans: ["Cambria", "Roboto"],
	},
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

// module.exports = {
// 	themes: ["light", "dark", "cupcake", "autumn"],
// };
