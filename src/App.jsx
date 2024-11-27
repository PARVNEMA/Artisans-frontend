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
function App() {
	return (
		<div className="flex flex-col ">
			<div className="bg-one text-white">
				<Navbar />
			</div>
			<main className="bg-four text-black">
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
					transition:Slide
				/>
			</main>
			<div className="bg-one text-five">
				<Footer />
			</div>
		</div>
	);
}

export default App;
