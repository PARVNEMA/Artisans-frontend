import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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

	// Handlers for file inputs
	const onFileChange1 = (e) =>
		setSelectedFiles1(e.target.files);
	const onFileChange2 = (e) =>
		setSelectedFiles2(e.target.files);

	// Submit handler with dynamic orderItemId
	const onSubmit = async (data, orderItemId) => {
		console.log("orderItemId", orderItemId);

		if (!selectedFiles1.length || !selectedFiles2.length) {
			toast.error(
				"Please select both pickup and delivery images."
			);
			return;
		}

		const formData = new FormData();

		// Add form data fields
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

		// Append selected images
		for (let i = 0; i < selectedFiles1.length; i++) {
			formData.append("pickupImages", selectedFiles1[i]);
		}
		for (let i = 0; i < selectedFiles2.length; i++) {
			formData.append("deliveryImages", selectedFiles2[i]);
		}

		try {
			// Replace placeholders dynamically
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

	// Fetch logistics orders items
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
		<div>
			<h1>Order Item {orderId}</h1>
			{ordersitems.map((item, index) => (
				<div key={item.orderItemId}>
					<h2>Delivery Address</h2>
					<p>
						{item.deliveryAddress.city},{" "}
						{item.deliveryAddress.state},{" "}
						{item.deliveryAddress.country} -{" "}
						{item.deliveryAddress.zipCode}
					</p>
					<h2>Pickup Address</h2>
					<p>
						{item.pickupAddress.city},{" "}
						{item.pickupAddress.state},{" "}
						{item.pickupAddress.country} -{" "}
						{item.pickupAddress.zipCode}
					</p>

					<form
						onSubmit={handleSubmit((data) =>
							onSubmit(data, item.orderItemId)
						)}
					>
						<div className="flex flex-col">
							<label htmlFor={`pickup-image-${index}`}>
								Pickup Image
							</label>
							<input
								type="file"
								id={`pickup-image-${index}`}
								onChange={onFileChange1}
								multiple
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor={`delivery-image-${index}`}>
								Delivery Image
							</label>
							<input
								type="file"
								id={`delivery-image-${index}`}
								onChange={onFileChange2}
								multiple
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor={`delivery-image-${index}`}>
							Change Status
							</label>
							<select name="status" id="">
								
							</select>
						</div>
						<button
							type="submit"
							className="btn btn-primary"
						>
							Submit
						</button>
					</form>
				</div>
			))}
		</div>
	);
}

export default OrderItem;
