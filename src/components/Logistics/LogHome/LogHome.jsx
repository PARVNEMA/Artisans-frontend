import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from "recharts";
import SalesPrediction from "../../Prediction/salesPrediction";
const LogHome = () => {
	const backendurl = import.meta.env.VITE_URL;
	const [orders, setOrders] = useState([]);
	const [countryStats, setCountryStats] = useState([]);
	const [orderStats, setOrderStats] = useState([]);
	const [artisanDetail, setArtisanDetail] = useState(null);
	const [stateArtisanDetail, setStateArtisanDetail] =
		useState(null);
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
			console.log("logistics orders=", res.data.data);
			setOrders(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, [backendurl]);
	const getCountryStats = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/country-stats`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("country Stats=", res.data.data);
			setCountryStats(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, [backendurl]);
	const getOrderStats = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/order-stats`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("order Stats=", res.data.data);
			setOrderStats(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, [backendurl]);
	const data = orderStats?.salesByMonth?.map(
		(sales, index) => ({
			name: `Month ${index + 1}`,
			sales,
		})
	);
	const getArtisanDetail = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/artisan-detail`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("artisan detail=", res.data.data);
			setArtisanDetail(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, [backendurl]);
	const getArtisansStateWise = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/logistics/artisan-wise-state-detail`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("state artisan detail=", res.data.data);
			setStateArtisanDetail(res.data.data);
		} catch (error) {
			console.error("error in logistics ", error);
		}
	}, [backendurl]);
	const adminLogout = useCallback(async () => {
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
	}, [backendurl, navigate]);
	const dimensions = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[8, 7, 6],
		[5, 4, 3],
		[3, 2, 1],
	];
	const weight = [32, 43, 54, 65, 76, 87];
	useEffect(() => {
		getLogisticsOrders();
		getCountryStats();
		getOrderStats();
		getArtisanDetail();
		getArtisansStateWise();
	}, [
		getLogisticsOrders,
		getCountryStats,
		getOrderStats,
		getArtisanDetail,
		getArtisansStateWise,
	]);
	const formatDimensions = (dims) => {
		return dims.join(" x ");
	};
	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
	];
	return (
		<div className="min-h-screen bg-gray-100">
			{" "}
			<div className="flex items-center w-full p-6 bg-white shadow-md">
				{" "}
				<div className="flex-grow">
					{" "}
					<h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
						{" "}
						Logistics Dashboard{" "}
					</h1>{" "}
				</div>{" "}
				<button
					onClick={adminLogout}
					className="btn btn-error"
				>
					{" "}
					Logout{" "}
				</button>{" "}
			</div>{" "}
			{/* Summary Cards */}{" "}
			<div className="grid grid-cols-2 gap-4 p-6">
				{" "}
				<Link to={"/allartisans"}>
					<div className="bg-white p-4 shadow-md rounded-lg">
						{" "}
						<h2 className="text-xl font-semibold">
							Total Artisans
						</h2>{" "}
						<p className="text-3xl font-bold">
							{artisanDetail?.length || 0}
						</p>{" "}
					</div>
				</Link>{" "}
				<div className="bg-white p-4 shadow-md rounded-lg">
					{" "}
					<h2 className="text-xl font-semibold">
						Total Orders
					</h2>{" "}
					<p className="text-3xl font-bold">
						{orders?.length || 0}
					</p>{" "}
				</div>{" "}
			</div>{" "}
			<div className="p-6">
				{" "}
				{/* Orders Line Chart */}{" "}
				{/* Country Stats Pie Chart */}{" "}
				<div className="bg-white p-6 shadow-md rounded-lg mt-10 flex justify-around">
					<ResponsiveContainer width="45%" height={400}>
						<h1 className="text-center font-bold text-lg">
							Country Shippings
						</h1>
						<PieChart>
							<Pie
								data={countryStats}
								dataKey="count"
								nameKey="country"
								cx="50%"
								cy="50%"
								outerRadius={150}
								fill="#8884d8"
							>
								{countryStats?.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>

					<ResponsiveContainer width="45%" height={400}>
						<h1 className="text-center font-bold text-lg">
							Artisans States
						</h1>
						<PieChart>
							<Pie
								data={stateArtisanDetail}
								dataKey="count"
								nameKey="state"
								cx="50%"
								cy="50%"
								outerRadius={150}
							>
								{stateArtisanDetail?.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<ResponsiveContainer
					width="100%"
					height={400}
					className={`mt-5`}
				>
					<h1 className="text-center font-bold text-lg">
						Shippings Per Month
					</h1>
					<BarChart data={data}>
						{" "}
						<CartesianGrid
							stroke="#ccc"
							strokeDasharray="5 5"
						/>{" "}
						<XAxis dataKey="name" /> <YAxis /> <Tooltip />{" "}
						<Legend />{" "}
						<Bar dataKey="sales" fill="#8884d8" />{" "}
					</BarChart>{" "}
				</ResponsiveContainer>
				<SalesPrediction />
			</div>{" "}
			{}{" "}
			<div className="flex flex-col p-6">
				{" "}
				<table className="min-w-full bg-white shadow-md rounded-lg">
					{" "}
					<thead className="bg-three text-white">
						{" "}
						<tr>
							{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								SNO
							</th>{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								Order ID
							</th>{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								Delivery Address
							</th>{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								Dimensions [l x w x h] (inch)
							</th>{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								Weight [kg]
							</th>{" "}
							<th className="py-3 px-6 text-left font-semibold uppercase">
								Status
							</th>{" "}
						</tr>{" "}
					</thead>{" "}
					<tbody>
						{" "}
						{orders.map((product, index) => (
							<tr
								key={product.orderId}
								className="border-b hover:bg-gray-100 transition-all cursor-pointer"
								onClick={() =>
									navigate(
										`/logistics/${product.orderId?._id}`
									)
								}
							>
								{" "}
								<td className="py-3 px-6 border">
									{index + 1}
								</td>{" "}
								<td className="py-3 px-6 border">
									{product?.orderId?._id}
								</td>{" "}
								<td className="py-3 px-6 border">
									{" "}
									{product?.deliveryAddress?.city},{" "}
									{product?.deliveryAddress?.state}{" "}
								</td>{" "}
								<td className="py-3 px-6 border">
									{formatDimensions(dimensions[index])}
								</td>{" "}
								<td className="py-3 px-6 border">
									{weight[index]}
								</td>{" "}
								<td className="py-3 px-6 border">
									{product?.status}
								</td>
							</tr>
						))}
						<tr>
							<td></td>
							<td className="py-3 px-6 border font-bold">
								Total Shipping Cost= Base Rate + Weight ×
								Rate per Pound + Additional Fees
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default LogHome;
