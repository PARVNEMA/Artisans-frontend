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
				<div className="flex items-center w-full">
					{/* Header */}
					<div className="w-[85%] pl-[8rem]">
						<h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
							Welcome !! {artisans?.fullName}
						</h1>
						<p className="font-semibold text-three text-center">
							Here is your dashboard
						</p>
					</div>

					{/* Add new product */}
					<div className="bg-three hover:bg-opacity-75 bg-opacity-95 text-white rounded-full flex justify-center">
						<Link to={"/artisans/productlisting"}>
							<button className="p-5 font-bold ">
								Add new product
							</button>
						</Link>
					</div>
				</div>

				{/* artisans matrices */}
				{artisansmatrices && (
					<div className="flex justify-center p-auto">
						<div className="grid grid-cols-4 mx-[8rem] my-20 gap-20">
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Total Products</h2>
								<p className="text-xl">
									{artisansproducts.length}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Products Sold</h2>
								<p className="text-xl">
									{artisansmatrices.productsSold}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">
									Customer satisfaction
								</h2>
								<p className="text-xl">
									{
										artisansmatrices.customerSatisfactionRate
									}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Dispute Rate</h2>
								<p className="text-xl">
									{artisansmatrices.disputeRate}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">
									Product refundAndReturnRate
								</h2>
								<p className="text-xl">
									{artisansmatrices.refundAndReturnRate}
								</p>
							</div>
							{/* <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Refund Rate</h2>
								<p className="text-xl">
									{artisansmatrices.refundRate}
								</p>
							</div> */}
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-four bg-opacity-90 hover:bg-opacity-75 w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Revenue</h2>
								<p className="text-xl">
									{currency === "INR"
										? "₹"
										: currency === "USD"
										? "$"
										: "€ "}
									{artisansmatrices.totalRevenue}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Charts */}
				<div className="flex mx-[10rem] justify-between items-center flex-col lg:flex-row">
					{/* Bar Graph */}
					<div className="pt-10">
						<BarChart width={600} height={400} data={data2}>
							<Bar dataKey="sales" fill="green" />
							<CartesianGrid stroke="#ccc" />
							<XAxis dataKey="name" />
							<YAxis />
						</BarChart>
					</div>

					{/* Pie Chart*/}
					<div>
						<PieChart width={400} height={400}>
							<Pie
								activeIndex={activeIndex}
								data={data}
								dataKey="count"
								outerRadius={200}
								fill="green"
								onMouseEnter={onPieEnter}
								style={{
									cursor: "pointer",
									outline: "none",
								}} // Ensure no outline on focus
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</div>
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

					{/* Order */}
					<div className="mx-[10rem]">
						{artisansproducts.map((product) => (
							<div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
								<img
									src={product.images}
									alt=""
									className="h-20 w-20 "
								/>
								<div className="flex flex-col justify-between">
									<h2 className="text-2xl uppercase">
										<b>Title:</b> {product.title}
									</h2>
								</div>
								<div className="text-xl">
									<p>
										<b className="uppercase">Quantity:</b>{" "}
										{
											artisansmatrices?.orderRequests[0]
												?.quantity
										}
									</p>
								</div>
								<div className="text-start flex lg:block">
									<p className="text-xl font-bold uppercase">
										<b className="uppercase">Order Date:</b>{" "}
									</p>
									<div className="text-xl flex justify-center items-center">
										<p>
											{artisansmatrices?.orderRequests[0]?.orderDate.slice(
												0,
												10
											)}
										</p>
									</div>
								</div>
								<div className="text-start flex lg:block">
									<p className="text-xl font-bold uppercase">
										Status:{" "}
									</p>
									<div className="text-xl flex justify-center items-center">
										{
											artisansmatrices?.orderRequests[0]
												?.status
										}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* artisans products */}
				<div className="mx-[10rem] text-start">
					<div className="text-5xl font-extrabold text-three text-center p-8">
						Your Products
					</div>
					{artisansproducts.map((product) => (
						<div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
							<img
								src={product.images[0]}
								alt=""
								className="h-20 w-20 "
							/>
							<div className="flex flex-col justify-between">
								<h2 className="text-2xl uppercase">
									<b>Title:</b> {product.title}
								</h2>
								<p className="text-lg uppercase">
									<b>Category:</b> {product.category.name}
								</p>
							</div>
							<p className="text-xl">
								<b className="uppercase">Description:</b>{" "}
								{product.description}
							</p>
							<div className="text-xl">
								<p>
									<b className="uppercase">Sales:</b>{" "}
									{product.sales}
								</p>
								<p>
									<b className="uppercase">Views:</b>{" "}
									{product.views}
								</p>
							</div>

							<div className="text-start flex lg:block">
								<p className="text-xl font-bold uppercase">
									Price:{" "}
								</p>
								<div className="text-xl flex justify-center items-center">
									{currency === "INR"
										? "₹"
										: currency === "USD"
										? "$"
										: "€ "}
									{product.price}
								</div>
							</div>

							<div>
								<button
									className="btn btn-error"
									onClick={() => deleteProduct(product._id)}
								>
									Delete Product
								</button>
							</div>
							<div>
								<Link
									to={`/artisans/updateproduct/${product._id}`}
								>
									<button className="btn bg-three text-white">
										Update Product
									</button>
								</Link>
							</div>
							<div>
								<p>
									<b className="uppercase">Stock:</b>{" "}
									{product.stockQuantity}
								</p>
								<Edit
									onClick={() => setstockid(product._id)}
								/>
								<input
									type="number"
									name="stock"
									id=""
									className={`${
										stockid === product._id
											? "block"
											: "hidden"
									}`}
									placeholder="Enter Stock Quantity"
									value={stockquantity}
									onChange={(e) =>
										setstockquantity(e.target.value)
									}
								/>
								<button
									onClick={() => {
										updateStock(product._id, stockquantity);
										setstockid("");
									}}
								>
									<ArrowRightCircle />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Dashboard;
