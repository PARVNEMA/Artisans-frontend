import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";

function LogHome() {
	const backendurl = import.meta.env.VITE_URL;
	const [orders, setorders] = useState([]);

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

	useEffect(() => {
		getLogisticsOrders();
	}, []);
	return <div></div>;
}

export default LogHome;
