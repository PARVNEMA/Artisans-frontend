import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";

function YourOrders() {
	const backendurl = import.meta.env.VITE_URL;
	const [orderProducts, setorderProducts] = useState([]);
	const showBill = useCallback(async () => {
		try {
			const res = await axios.get(`${backendurl}/order`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			console.log("get current order Items", res.data);
			setorderProducts(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		showBill();
	}, []);
	return (
		<div className="mx-10">
			{orderProducts?.map((item, index) => (
				<div>
					<h1>Order No{index + 1}</h1>
					<h1>Total Order Price=₹{item?.totalPrice}</h1>

					<h1>Shipping Charges={item?.shippingCharges}</h1>
					{/* individual items in each order */}
					<div>
						{item?.items?.map((prod) => (
							<div>
								{/* <h1>{prod?.productId?.title}</h1> */}
								<div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
									<img
										src={prod?.productId?.images[0]}
										alt=""
										className="h-20 w-20 "
									/>
									<div className="flex flex-col justify-between">
										<h2 className="text-2xl uppercase">
											<b>Title:</b> {prod?.productId?.title}
										</h2>
									</div>
									<p className="text-xl">
										<b className="uppercase">
											Description:
										</b>{" "}
										{prod?.productId?.description}
									</p>

									<div className="text-start flex lg:block">
										<p className="text-xl font-bold uppercase">
											Price:{" "}
										</p>
										<div className="text-xl flex justify-center items-center">
											{prod?.productId?.price}
										</div>
									</div>
									<div className="text-start flex lg:block">
										<p className="text-xl font-bold uppercase">
											status:{" "}
										</p>
										<div className="text-xl flex justify-center items-center">
											{prod?.status}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="border border-b-8 border-b-red-600"></div>
				</div>
			))}
		</div>
	);
}

export default YourOrders;
