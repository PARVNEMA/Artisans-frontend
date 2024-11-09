import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
	return (
		<div className="flex flex-col">
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
