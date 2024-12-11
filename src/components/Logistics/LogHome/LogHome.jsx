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
						<div
							key={product.orderId}
							className="overflow-x-auto mb-6"
						>
							<table className="min-w-full bg-white shadow-md rounded-lg">
								<thead className="bg-three text-white">
									<tr>
										<th className="py-3 px-6 text-left font-semibold uppercase">
											SNO
										</th>
										<th className="py-3 px-6 text-left font-semibold uppercase">
											Order ID
										</th>
										<th className="py-3 px-6 text-left font-semibold uppercase">
											Pickup Address
										</th>
										<th className="py-3 px-6 text-left font-semibold uppercase">
											Delivery Address
										</th>
										<th className="py-3 px-6 text-left font-semibold uppercase">
											Order Item ID
										</th>
									</tr>
								</thead>
								<tbody>
									{product?.items?.map((item, index) => (
										<tr
											key={item?._id}
											className="border-b hover:bg-gray-100 transition-all cursor-pointer"
											onClick={() =>
												(window.location.href = `/logistics/${product.orderId}`)
											}
										>
											<td className="py-3 px-6 border">
												{index + 1}
											</td>
											<td className="py-3 px-6 border">
												{product?.orderId}
											</td>
											<td className="py-3 px-6 border">
												{item?.pickupAddress || "N/A"}
											</td>
											<td className="py-3 px-6 border">
												{item?.deliveryAddress || "N/A"}
											</td>
											<td className="py-3 px-6 border">
												{item?.orderItemId || "N/A"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LogHome;
