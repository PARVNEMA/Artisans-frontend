import axios from "axios";
import React, {
	useCallback,
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
import { useArtisansAuth } from "../../../../useContext/ArtisansContext.jsx";
import { Link } from "react-router-dom";

function Dashboard() {
	{
		const backendurl = import.meta.env.VITE_URL;
		const [artisansproducts, setArtisansProducts] =
			useState([]);
		const [artisansmatrices, setArtisansMatrices] =
			useState(null);
		const [artisans, setArtisans] = useState(null);
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
						`${backendurl}/artisans/matrices/${artisans?._id}`,
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
						"current artisans metrices",
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
					`${backendurl}/artisans/current-user`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log("res in getcurrent artisans", res.data);
				setArtisans(res.data.data);
			} catch (error) {
				console.log("Error", error);
			}
		}, []);
		useEffect(() => {
			getCurrentArtisans();
		}, [getCurrentArtisans]);
		useEffect(() => {
			if (artisans) {
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

		const data = [
			{ name: "Returns", students: 400 },
			{ name: "Sales", students: 700 },
			{ name: "Disputes", students: 200 },
			{ name: "Total", students: 1000 },
		];

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
		const data2 = [
			{ name: "Jan", sales: 400 },
			{ name: "Feb", sales: 700 },
			{ name: "Mar", sales: 200 },
			{ name: "Apr", sales: 1000 },
			{ name: "May", sales: 400 },
			{ name: "Jun", sales: 700 },
			{ name: "Jul", sales: 200 },
			{ name: "Aug", sales: 1000 },
			{ name: "Sep", sales: 400 },
			{ name: "Oct", sales: 700 },
			{ name: "Nov", sales: 200 },
			{ name: "Dec", sales: 1000 },
		];

		return (
			<div>
				<div className="flex items-center w-full">
					{/* Header */}
					<div className="w-[85%] pl-[8rem]">
						<h1 className="text-5xl font-bold uppercase text-center mt-10 mb-3">
							Welcome !! {artisans?.fullName}
						</h1>
						<p className="font-semibold text-center">
							Here is your dashboard
						</p>
					</div>

					{/* Add new product */}
					<div className="bg-three hover:bg-two rounded-full flex justify-center">
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
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Total Products</h2>
								<p className="text-xl">
									{/* {artisansmatrices.metrics.totalProducts} */}
									0
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">
									Customer satisfaction
								</h2>
								<p className="text-xl">
									{
										artisansmatrices.metrics
											.customerSatisfaction
									}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Dispute Rate</h2>
								<p className="text-xl">
									{artisansmatrices.metrics.disputeRate}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">
									Product Selling Rate
								</h2>
								<p className="text-xl">
									{
										artisansmatrices.metrics
											.productSellingRate
									}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Refund Rate</h2>
								<p className="text-xl">
									{artisansmatrices.metrics.refundRate}
								</p>
							</div>
							<div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
								<h2 className="text-xl ">Return Rate</h2>
								<p className="text-xl">
									{artisansmatrices.metrics.returnRate}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Charts */}
				<div className="flex mx-[10rem] justify-between">
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
								dataKey="students"
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

				{/* artisans products */}
				<div>
					<div className="text-3xl text-center">
						Your Products
					</div>
					{artisansproducts.map((product) => (
						<div>
							<p>{product.title}</p>
							<img
								src={product.images}
								alt=""
								className="h-14 w-14"
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Dashboard;
