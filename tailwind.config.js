/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			one: "#25372c", // navabr and footer 
			two: "#bcd267",
			three: "#93785B",
			four: "#F9F2EA",// background and button
			five: "#e8f3f5",// text 
			white: "#FFFFFF",
			black: "#000000",
		},
	},
	plugins: [daisyui],
	fontFamily: {
		sans: [ "Playfair Display", "seri", "system-ui"],
		
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
