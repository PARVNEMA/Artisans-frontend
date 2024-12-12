import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function OrderItem() {
	const { orderId } = useParams();
	const backendurl = import.meta.env.VITE_URL;
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [selectedFiles1, setSelectedFiles1] = useState([]);
	const [selectedFiles2, setSelectedFiles2] = useState([]);
	const [ordersitems, setOrdersItems] = useState([]);

	const onFileChange1 = (e) =>
		setSelectedFiles1(e.target.files);
	const onFileChange2 = (e) =>
		setSelectedFiles2(e.target.files);

	const onSubmit = async (data, orderItemId) => {
		if (!selectedFiles1.length || !selectedFiles2.length) {
			toast.error(
				"Please select both pickup and delivery images."
			);
			return;
		}

		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

		for (let i = 0; i < selectedFiles1.length; i++) {
			formData.append("pickupImages", selectedFiles1[i]);
		}
		for (let i = 0; i < selectedFiles2.length; i++) {
			formData.append("deliveryImages", selectedFiles2[i]);
		}

		try {
			const url = `${backendurl}/logistics/order-status/${orderId}/${orderItemId}`;
			const res = await axios.post(url, formData, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"logisticaccessToken"
					)}`,
				},
			});

			toast.success("Product uploaded successfully");
			navigate("/artisans/dashboard");
		} catch (error) {
			console.error("Error in form submission", error);
			toast.error(
				"Failed to upload images. Please try again."
			);
		}
	};

	const getLogisticsOrdersItems = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/products/${orderId}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"logisticaccessToken"
						)}`,
					},
				}
			);
			setOrdersItems(res.data.data);
			console.log("orders items", res.data.data);
		} catch (error) {
			console.error(
				"Error fetching logistics items",
				error
			);
			toast.error("Failed to load order items.");
		}
	}, [backendurl, orderId]);

	useEffect(() => {
		getLogisticsOrdersItems();
	}, [getLogisticsOrdersItems]);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-3xl font-bold text-center mb-8">
				Order Item {orderId}
			</h1>
			{Array.isArray(ordersitems) &&
			ordersitems.length > 0 ? (
				ordersitems.map((item, index) => (
					<div
						key={item.orderItemId}
						className="mb-6 bg-white shadow-md border border-gray-200 p-6 rounded-lg"
					>
						<h2>Status: {item.status}</h2>
						<h2 className="text-xl font-bold text-gray-700 mb-2">
							Delivery Address
						</h2>
						<p className="text-gray-600 mb-4">
							{item.deliveryAddress.city},{" "}
							{item.deliveryAddress.state},{" "}
							{item.deliveryAddress.country} -{" "}
							{item.deliveryAddress.zipCode}
						</p>

						<h2 className="text-xl font-bold text-gray-700 mb-2">
							Pickup Address
						</h2>
						<p className="text-gray-600 mb-4">
							{item.pickupAddress.city},{" "}
							{item.pickupAddress.state},{" "}
							{item.pickupAddress.country} -{" "}
							{item.pickupAddress.zipCode}
						</p>

						<form
							onSubmit={handleSubmit((data) =>
								onSubmit(data, item.orderItemId)
							)}
							className="mt-4"
						>
							<div className="flex flex-col mb-4">
								<label
									htmlFor={`pickup-image-${index}`}
									className="font-bold text-gray-700 mb-2"
								>
									Pickup Image
								</label>
								<input
									type="file"
									id={`pickup-image-${index}`}
									onChange={onFileChange1}
									multiple
									className="border border-gray-300 rounded p-2 focus:outline-blue-500"
								/>
							</div>

							<div className="flex flex-col mb-4">
								<label
									htmlFor={`delivery-image-${index}`}
									className="font-bold text-gray-700 mb-2"
								>
									Delivery Image
								</label>
								<input
									type="file"
									id={`delivery-image-${index}`}
									onChange={onFileChange2}
									multiple
									className="border border-gray-300 rounded p-2 focus:outline-blue-500"
								/>
							</div>

							<div className="flex flex-col mb-4">
								<label
									htmlFor={`status-${index}`}
									className="font-bold text-gray-700 mb-2"
								>
									Change Status
								</label>
								<select
									name="status"
									id={`status-${index}`}
									className="border border-gray-300 rounded p-2 focus:outline-blue-500"
									{...register("status")}
								>
									<option value="Pending">Pending</option>
									<option value="Picked">Picked</option>
									<option value="Delivered">
										Delivered
									</option>
								</select>
								{errors.status && (
									<p className="text-red-500 mt-2">
										{errors.status.message}
									</p>
								)}
							</div>

							<button
								type="submit"
								className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
							>
								Submit
							</button>
						</form>
					</div>
				))
			) : (
				<p className="text-center text-gray-600">
					No order items found.
				</p>
			)}
		</div>
	);
}

export default OrderItem;
