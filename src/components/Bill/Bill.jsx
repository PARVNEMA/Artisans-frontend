import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";

function Bill() {
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
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		showBill();
	}, []);

	return (
		<div className=" flex justify-center items-center ">
			<div className="bg-four h-[60vh] w-[60vw]"></div>
		</div>
	);
}

export default Bill;
