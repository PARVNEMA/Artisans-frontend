import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";

function AdminHome() {
	const [currentartisans, setcurrentartisans] = useState(
		[]
	);
	const [currentusers, setcurrentusers] = useState(0);

	const backendurl = import.meta.env.VITE_URL;
	const getProductAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/product-analytics`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current product analytics=",
				res.data.data
			);
			//       Productcount
			// :
			// artisanPerProduct
			// :
			// avgProductPerArtisan
			// :
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	const getSalesAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/sales-analytics`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Sales analytics=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			// toast.error(error.message);
		}
	}, []);
	const getFinanceAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/financial-overview`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Finance analytics=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			// toast.error(error.message);
		}
	}, []);
	const getActiveArtisansDetails = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/registered-artisans`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active Artisans analytics=",
				res.data.data
			);
			setcurrentartisans(res.data.data.activeArtisans);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	const getActiveUserDetails = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/registered-customers`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active User analytics=",
				res.data.data
			);
			setcurrentusers(res.data.data);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	useEffect(() => {
		getProductAnalytics();
		getSalesAnalytics();
		getFinanceAnalytics();
		getActiveArtisansDetails();
		getActiveUserDetails();
	}, []);

	return (
		<div>
			<h1 className="text-4xl ">Admin Home</h1>

			{/* calling active artisans */}
			<div>
				<table className="border border-solid border-black">
					<tr className="border border-solid border-black">
						<th>Id</th>
						<th>avatar</th>
						<th>fullName</th>
						<th>username</th>
						<th>email</th>
						<th>phoneNo</th>
					</tr>
					{currentartisans.map((artisan) => (
						<tr className="border border-solid border-black">
							<td>{artisan._id}</td>
							<td>
								<img
									src={artisan.avatar}
									alt=""
									className="h-16 w-16"
								/>
							</td>
							<td>{artisan.fullName}</td>
							<td>{artisan.username}</td>
							<td>{artisan.email}</td>
							<td>{artisan.phoneNo}</td>
						</tr>
					))}
				</table>
			</div>

			{/* customer count */}
			<div>
				<h1>Total customer count:</h1>
				{currentusers}
			</div>
		</div>
	);
}

export default AdminHome;
