/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: [],
	plugins: [daisyui],
	fontFamily: {
		sans: ["Cambria", "Roboto",],
	},
	daisyui: {
		themes: ["light", "black", "wireframe", "autumn","forest","cupcake"],
	},
};

// module.exports = {
// 	themes: ["light", "dark", "cupcake", "autumn"],
// };
