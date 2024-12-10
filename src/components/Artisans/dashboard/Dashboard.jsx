import axios from "axios";
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	Cell,
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";
import { useAuthArtisans } from "../../../../useContext/ArtisansContext.jsx";
import { Link } from "react-router-dom";
import {
	FaCubes,
	FaDollarSign,
	FaSmile,
	FaExchangeAlt,
	FaClipboardCheck,
	FaHandHoldingUsd,
} from "react-icons/fa";
import {
	ArrowRightCircle,
	Edit,
	IndianRupee,
	IndianRupeeIcon,
} from "lucide-react";
import { CurrencyContext } from "../../../../useContext/CurrencyContext.jsx";

function Dashboard() {
	{
		const { currency } = useContext(CurrencyContext);
		const backendurl = import.meta.env.VITE_URL;
		const [artisansmatrices, setArtisansMatrices] =
			useState(null);
		const [artisans, setArtisans] = useState(null);
		const [artisansproducts, setArtisansProducts] =
			useState([]);
		const [stockid, setstockid] = useState(null);
		const [stockquantity, setstockquantity] = useState(0);

		const getArtisansProduct = useCallback(async () => {
			try {
				const res = await axios.get(
					`${backendurl}/products/myProducts`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log("current artisans products", res.data);
				setArtisansProducts(res.data.data);
			} catch (error) {
				console.error("error in dashboard ", error);
			}
		}, []);
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
						"current artisans metrices =",
						res.data
					);
					setArtisansMatrices(res.data.data);
				} catch (error) {
					console.error("error in dashboard ", error);
				}
			}, [artisans?._id]);
		const getCurrentArtisans = useCallback(async () => {
			try {
				const res = await axios.get(
					`${backendurl}/artisans/detail`,
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
					"res in getcurrent artisans details =",
					res.data
				);
				setArtisans(res.data.data.artisan);
			} catch (error) {
				console.log("Error", error);
			}
		}, []);
		const deleteProduct = useCallback(async (productId) => {
			try {
				console.log("product to be deleted", productId);

				const res = await axios.delete(
					`${backendurl}/products/${productId}`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log("product deleted =", res.data);
			} catch (error) {
				console.log("Error", error);
			}
		}, []);
		useEffect(() => {
			getCurrentArtisans();
		}, [getCurrentArtisans]);
		useEffect(() => {
			if (localStorage.getItem("artisansaccessToken")) {
				console.log(
					"User is logged in, fetching products..."
				);
				getArtisansProduct();
				getArtisansSellerMetrices();
			}
		}, [
			artisans,
			getArtisansProduct,
			getArtisansSellerMetrices,
		]);

		//For pie chart
		const [activeIndex, setActiveIndex] = useState(-1);

		const data = artisansmatrices?.countryStats
			? artisansmatrices.countryStats.map((item) => ({
					name: item.country,
					count: item.count,
			  }))
			: [];

		const COLORS = [
			"#0088FE",
			"#00C49F",
			"#FFBB28",
			"#FF8042",
		];

		const onPieEnter = (_, index) => {
			setActiveIndex(index);
		};

		// Bar graph
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const data2 = artisansmatrices?.salesByMonth
			? artisansmatrices.salesByMonth.map(
					(item, index) => ({
						name: months[index++],
						sales: item,
					})
			  )
			: [];

		// const data2 = [
		// 	{ name: "Jan", sales: 400 },
		// 	{ name: "Feb", sales: 700 },
		// 	{ name: "Mar", sales: 200 },
		// 	{ name: "Apr", sales: 1000 },
		// 	{ name: "May", sales: 400 },
		// 	{ name: "Jun", sales: 700 },
		// 	{ name: "Jul", sales: 200 },
		// 	{ name: "Aug", sales: 1000 },
		// 	{ name: "Sep", sales: 400 },
		// 	{ name: "Oct", sales: 700 },
		// 	{ name: "Nov", sales: 200 },
		// 	{ name: "Dec", sales: 1000 },
		// ];
		const updateStock = async (
			productId,
			stockquantity
		) => {
			console.log("productId", productId);
			console.log("stockQuantity", stockquantity);

			try {
				const res = await axios.patch(
					`${backendurl}/products/${productId}/stock`,
					{ quantity: stockquantity },
					{
						withCredentials: true, // Ensure cookies are included in the request
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);

				console.log("Stock updated", res.data);
				getArtisansProduct();
			} catch (error) {
				console.log(
					"Error in updating stock quantity",
					error.response ? error.response.data : error
				);
			}
		};

		// Call the function with appropriate arguments
		// updateStock(productId, stockquantity);

		return (
			<div>
				{/* Header */}{" "}
				<div className="flex flex-col lg:flex-row items-center w-full p-6 bg-one">
					{" "}
					<div className="lg:w-3/4 w-full lg:pl-[8rem] text-center lg:text-left">
						{" "}
						<h1 className="text-5xl font-extrabold uppercase text-three mt-10 mb-3">
							{" "}
							Welcome!! {artisans?.fullName}{" "}
						</h1>{" "}
						<p className="font-semibold text-three">
							{" "}
							Here is your dashboard{" "}
						</p>{" "}
					</div>{" "}
					<div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
						{" "}
						<Link
							to={"/artisans/productlisting"}
							className="bg-three hover:bg-opacity-75 text-white rounded-full p-5 font-bold transition duration-300"
						>
							{" "}
							Add New Product{" "}
						</Link>{" "}
						<Link
							to={"/address"}
							className="bg-three hover:bg-opacity-75 text-white rounded-full p-5 font-bold transition duration-300"
						>
							{" "}
							Add Your Address{" "}
						</Link>{" "}
						<Link
							to={`/artisans/chat/${artisans?._id}`}
							className="bg-three hover:bg-opacity-75 text-white rounded-full p-5 font-bold transition duration-300"
						>
							{" "}
							See Chats{" "}
						</Link>{" "}
					</div>{" "}
				</div>{" "}
				{/* Artisans Matrices */}{" "}
				<div className="flex justify-center p-6">
					{" "}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
						{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-blue-500 to-blue-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaCubes className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Total Products
							</h2>{" "}
							<p className="text-xl">
								{artisansproducts?.length}
							</p>{" "}
						</div>{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-green-500 to-green-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaClipboardCheck className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Products Sold
							</h2>{" "}
							<p className="text-xl">
								{artisansmatrices?.productsSold}
							</p>{" "}
						</div>{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-purple-500 to-purple-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaExchangeAlt className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Refund & Return Rate
							</h2>{" "}
							<p className="text-xl">
								{artisansmatrices?.refundAndReturnRate}
							</p>{" "}
						</div>{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-yellow-500 to-yellow-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaSmile className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Customer Satisfaction
							</h2>{" "}
							<p className="text-xl">
								{artisansmatrices?.customerSatisfactionRate}
							</p>{" "}
						</div>{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-red-500 to-red-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaExchangeAlt className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Dispute Rate
							</h2>{" "}
							<p className="text-xl">
								{artisansmatrices?.disputeRate}
							</p>{" "}
						</div>{" "}
						<div className="h-auto shadow-lg rounded-3xl bg-gradient-to-r from-indigo-500 to-indigo-300 text-white flex flex-col p-8 gap-5 justify-center items-center text-center transform transition-transform hover:scale-105">
							{" "}
							<FaDollarSign className="text-4xl" />{" "}
							<h2 className="text-2xl font-bold">
								Revenue
							</h2>{" "}
							<p className="text-xl">
								{" "}
								{currency === "INR"
									? "₹"
									: currency === "USD"
									? "$"
									: "€"}{" "}
								{artisansmatrices?.totalRevenue}{" "}
							</p>{" "}
						</div>{" "}
					</div>{" "}
				</div>
				{/* Charts */}{" "}
				<div className="p-6">
					{" "}
					<h1 className="text-5xl font-extrabold uppercase text-three text-center mb-8">
						{" "}
						Sales Analytics{" "}
					</h1>{" "}
					<div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20">
						{" "}
						{/* Bar Chart */}{" "}
						<div className="p-4 rounded-lg shadow-lg bg-white w-full lg:w-auto">
							{" "}
							<h3 className="text-center text-2xl font-bold mb-4 text-three">
								{" "}
								Sales Bar Chart{" "}
							</h3>{" "}
							<BarChart
								width={600}
								height={400}
								data={data2}
							>
								{" "}
								<Bar dataKey="sales" fill="#4CAF50" />{" "}
								<CartesianGrid
									stroke="#ccc"
									strokeDasharray="5 5"
								/>{" "}
								<XAxis dataKey="name" /> <YAxis />{" "}
								<Tooltip />{" "}
							</BarChart>{" "}
						</div>{" "}
						{/* Pie Chart */}{" "}
						<div className="p-4 rounded-lg shadow-lg bg-white w-full lg:w-auto flex flex-col items-center">
							{" "}
							<h3 className="text-center text-2xl font-bold mb-4 text-three">
								{" "}
								Country-wise Sales{" "}
							</h3>{" "}
							<PieChart width={400} height={400}>
								{" "}
								<Pie
									activeIndex={activeIndex}
									data={data}
									dataKey="count"
									outerRadius={200}
									fill="#4CAF50"
									onMouseEnter={(data, index) =>
										onPieEnter(index)
									}
									style={{
										cursor: "pointer",
										outline: "none",
									}}
								>
									{" "}
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}{" "}
								</Pie>{" "}
								<Tooltip />{" "}
							</PieChart>{" "}
						</div>{" "}
					</div>{" "}
				</div>
				{/* pending orders  */}
				<div>
					<div className="flex items-center w-full">
						<div className="w-[85%] pl-[8rem]">
							<h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
								Pending Orders
							</h1>
						</div>
						<div className="bg-three hover:bg-opacity-75 bg-opacity-95 text-white rounded-full flex justify-center">
							<Link to={"/artisans/pendingorders"}>
								<button className="p-5 font-bold ">
									View All
								</button>
							</Link>
						</div>
					</div>

					{/* Pending Order */}
					<div>
						{" "}
						{artisansmatrices?.orderRequests?.length ===
						0 ? (
							<div className="text-three font-bold text-xl text-center">
								No order requests available !!
							</div>
						) : (
							<div className="mx-[10rem]">
								{" "}
								<div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
									{" "}
									<img
										src={
											artisansmatrices?.orderRequests[0]
												?.productImage[0]
										}
										alt="Order"
										className="h-20 w-20"
									/>{" "}
									<div className="flex flex-col justify-between">
										{" "}
										<h2 className="text-2xl uppercase">
											{" "}
											<b>Title:</b>{" "}
											{
												artisansmatrices?.orderRequests[0]
													?.productName
											}{" "}
										</h2>{" "}
									</div>{" "}
									<div className="text-xl">
										{" "}
										<p>
											{" "}
											<b className="uppercase">
												Quantity:
											</b>{" "}
											{
												artisansmatrices?.orderRequests[0]
													?.quantity
											}{" "}
										</p>{" "}
									</div>{" "}
									<div className="text-start flex lg:block">
										{" "}
										<p className="text-xl font-bold uppercase">
											{" "}
											<b className="uppercase">
												Order Date:
											</b>{" "}
										</p>{" "}
										<div className="text-xl flex justify-center items-center">
											{" "}
											<p>
												{" "}
												{artisansmatrices?.orderRequests[0]?.orderDate.slice(
													0,
													10
												)}{" "}
											</p>{" "}
										</div>{" "}
									</div>{" "}
									<div className="text-start flex lg:block">
										{" "}
										<p className="text-xl font-bold uppercase">
											Status:
										</p>{" "}
										<div className="text-xl flex justify-center items-center">
											{" "}
											{
												artisansmatrices?.orderRequests[0]
													?.status
											}{" "}
										</div>{" "}
									</div>{" "}
								</div>{" "}
							</div>
						)}{" "}
					</div>
				</div>
				{/* artisans products */}
				<div className="mx-[10rem] text-start">
					<div className="text-5xl font-extrabold text-three text-center p-8">
						Your Products
					</div>{" "}
					<div className="overflow-x-auto mb-12">
						{" "}
						<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
							{" "}
							<thead className="bg-four text-white">
								{" "}
								<tr>
									{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										SNO
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Image
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Title
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Category
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Description
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Sales
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Views
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Price
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Action
									</th>{" "}
									<th className="py-3 px-6 font-semibold uppercase">
										Stock
									</th>{" "}
								</tr>{" "}
							</thead>{" "}
							<tbody>
								{" "}
								{artisansproducts.map((product, i) => (
									<tr
										key={product._id}
										className="bg-white border-b hover:bg-gray-100 transition-all"
									>
										{" "}
										<td className="py-3 px-6 border text-center">
											{i + 1}.
										</td>{" "}
										<td className="py-3 px-6 ">
											{" "}
											<img
												src={product.images[0]}
												alt={product.title}
												className="h-16 w-16 object-fill rounded-full"
											/>{" "}
										</td>{" "}
										<td className="py-3 px-6 border">
											{product.title}
										</td>{" "}
										<td className="py-3 px-6 border">
											{product.category.name}
										</td>{" "}
										<td className="py-3 px-6 border">
											{product.description}
										</td>{" "}
										<td className="py-3 px-6 border">
											{product.sales}
										</td>{" "}
										<td className="py-3 px-6 border">
											{product.views}
										</td>{" "}
										<td className="py-3 px-6 ">
											{" "}
											{currency === "INR"
												? "₹"
												: currency === "USD"
												? "$"
												: "€ "}{" "}
											{product.price}{" "}
										</td>{" "}
										<td className="py-3 px-6 flex flex-col justify-center items-center gap-1">
											{" "}
											<button
												className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
												onClick={() =>
													deleteProduct(product._id)
												}
											>
												{" "}
												Delete{" "}
											</button>{" "}
											<Link
												to={`/artisans/updateproduct/${product._id}`}
											>
												{" "}
												<button className="py-1 px-3 bg-three text-white rounded-lg hover:bg-opacity-75 transition-all">
													{" "}
													Update{" "}
												</button>{" "}
											</Link>{" "}
										</td>{" "}
										<td className="py-3 px-6 border">
											{" "}
											<p className="uppercase">
												Stock: {product.stockQuantity}
											</p>{" "}
											<Edit
												onClick={() =>
													setstockid(product._id)
												}
											/>{" "}
											<input
												type="number"
												name="stock"
												className={`border rounded px-2 py-1 ${
													stockid === product._id
														? "block"
														: "hidden"
												}`}
												placeholder="Enter Stock Quantity"
												value={stockquantity}
												onChange={(e) =>
													setstockquantity(e.target.value)
												}
											/>{" "}
											<button
												className={`ml-2 ${
													stockid === product._id
														? "block"
														: "hidden"
												}`}
												onClick={() => {
													updateStock(
														product._id,
														stockquantity
													);
													setstockid("");
												}}
											>
												{" "}
												<ArrowRightCircle />{" "}
											</button>{" "}
										</td>{" "}
									</tr>
								))}{" "}
							</tbody>{" "}
						</table>{" "}
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
