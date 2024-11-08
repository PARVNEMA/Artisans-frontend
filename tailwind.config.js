/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: [],
	plugins: [daisyui],
	daisyui: {
		themes: ["light", "black", "wireframe", "autumn"],
	},
};

// module.exports = {
// 	themes: ["light", "dark", "cupcake", "autumn"],
// };
