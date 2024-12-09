import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogHome() {
	const backendurl = import.meta.env.VITE_URL;
	const [orders, setorders] = useState([]);
	const navigate = useNavigate();

	const getLogisticsOrders = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/products`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("logisctics orders=", res.data.data);
			setorders(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, []);

	const onSubmit = async (data) => {
		const formData = new FormData();

		// Append form fields to FormData, ensuring both key and value are specified
		Object.keys(data).forEach((key) => {
			if (key !== "images") {
				console.log("each key", key, data[key]);
				formData.append(key, data[key]);
			}
		});

		// Append selected images to FormData
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append("images", selectedFiles[i]);
		}

		// Debugging: Log FormData entries to verify
		for (let pair of formData.entries()) {
			console.log(pair[0] + ": " + pair[1]);
		}

		try {
			const res = await axios.post(
				`${backendurl}/products/create`,
				formData,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${localStorage.getItem(
							"artisanaccessToken"
						)}`,
					},
				}
			);

			console.log(
				"res from uploading product from artisanss",
				res.data
			);
			navigate("/artisans/dashboard");
			toast.succes("Product uploaded successfully");
		} catch (error) {
			console.error("error in register form", error);
		}
	};
	const adminlogout = useCallback(async () => {
		try {
			const res = await axios.post(
				`${backendurl}/logistic/logout`,
				null,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"logisticaccessToken"
						)}`,
					},
				}
			);
			console.log("logout logistic", res.data.data);
			localStorage.removeItem("logisticaccessToken");
			toast.success("Logout successfully");
			navigate("/");
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);

	useEffect(() => {
		getLogisticsOrders();
	}, []);
	return (
		<div>
			<div>
				<div className="flex items-center w-full">
					<div className="w-[85%] pl-[8rem]">
						<h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
							Logistics Orders
						</h1>
						<button
							onClick={adminlogout}
							className="btn btn-error"
						>
							Logout
						</button>
					</div>
				</div>

				{/* Order */}
				<div className="flex flex-col">
					{orders.map((product) => (
						<div className="bg-four rounded-xl m-4 p-4 text-wrap">
							{product.items.map((item, index) => (
								<Link to={`/logistics/${product.orderId}`}>
									<div className="flex justify-between gap-5">
										<div>{index + 1}.</div>
										<div>orderId{item.orderId}</div>
										<div>{item.pickupAddress}</div>
										<div>{item.deliveryAddress}</div>
										<div>{item.orderItemId}</div>
									</div>
								</Link>
							))}
							<div className="text-xl text-three">
								{product.paymentStatus}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LogHome;
