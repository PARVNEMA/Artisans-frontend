import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";

function PendingOrders() {
	const [artisansmatrices, setArtisansMatrices] = useState(
		[]
	);

	const backendurl = import.meta.env.VITE_URL;
	const getArtisansSellerMetrices =
		useCallback(async () => {
			try {
				const res = await axios.get(
					`${backendurl}/artisans/dashboard`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log(
					"current artisans metrices in pending order=",
					res.data.data.orderRequests
				);
				setArtisansMatrices(res.data.data.orderRequests);
			} catch (error) {
				console.error("error in dashboard ", error);
			}
		}, []);

	useEffect(() => {
		getArtisansSellerMetrices();
	}, []);

	return (
		<div>
			{artisansmatrices?.map((item, index) => (
				<div>
					<h1>Order No{index + 1}</h1>
					<h1>Total Order Price=₹{item?.totalPrice}</h1>
					<h1>Shipping Charges={item?.shippingCharges}</h1>
					<h1>Order Status={item?.orderStatus}</h1>
				</div>
			))}
		</div>
	);
}

export default PendingOrders;
