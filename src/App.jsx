import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import {
	Slide,
	ToastContainer,
	toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/Chatbot";
function App() {
	return (
		<div className="flex flex-col ">
			<nav className="bg-one text-white">
				<Navbar />
			</nav>
			<main className="bg-one text-black relative">
				<Outlet />
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition="Slide"
				/>
				<Chatbot />
			</main>

			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
