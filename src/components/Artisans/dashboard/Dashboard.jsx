import axios from "axios";
import React, { useEffect, useState } from "react";

import { useArtisansAuth } from "../../../../useContext/ArtisansContext.jsx";
import { Link } from "react-router-dom";

function Dashboard() {
	const { dispatch, state } = useArtisansAuth();
	const backendurl = import.meta.env.VITE_URL;
	const [artisansproducts, setartisansproducts] = useState(
		[]
	);
	const [artisansmatrices, setartisansmatrices] =
		useState(null);

	const getArtisansProduct = async () => {
		try {
			const res = await axios.get(
				`${backendurl}/products/artisan/${state.artisansData._id}`,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("current artisans products", res.data);
			setartisansproducts(res.data.data);
		} catch (error) {
			console.error("error in dashbooard ", error);
		}
	};
	const getArtisansSellerMetrices = async () => {
		try {
			const res = await axios.get(
				`${backendurl}/artisans/matrices/${state.artisansData._id}`,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("current artisans metrices", res.data);
			setartisansmatrices(res.data.data);
		} catch (error) {
			console.error("error in dashbooard ", error);
		}
	};

	// console.log(state);

	useEffect(() => {
		console.log("State on mount or update:", state);
		if (state.isLoggedIn) {
			console.log(
				"User is logged in, fetching products..."
			);
			getArtisansProduct();
			getArtisansSellerMetrices();
		}
	}, [state.isLoggedIn, state.artisansData._id]);

	return (
		<div>
			<div>Dashboard{state.artisansData.fullName}</div>
			<br />

			<Link to={"/artisans/productlisting"}>
				<button className="bg-primary">
					ProductListing
				</button>
			</Link>

			<div>
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
			{/* artisans matrices */}
			<div>
				{artisansmatrices && (
					<div>
						<h2>Seller Metrices</h2>
						<div>
							<h2 className="text-2xl text-black">
								Customer satisfaction
							</h2>
							<p>
								{
									artisansmatrices.metrics
										.customerSatisfaction
								}
							</p>
						</div>
						<div>
							<h2 className="text-2xl text-black">
								dispute Rate
							</h2>
							<p>{artisansmatrices.metrics.disputeRate}</p>
						</div>
						<div>
							<h2 className="text-2xl text-black">
								productSellingRate
							</h2>
							<p>
								{
									artisansmatrices.metrics
										.productSellingRate
								}
							</p>
						</div>
						<div>
							<h2 className="text-2xl text-black">
								refund Rate
							</h2>
							<p>{artisansmatrices.metrics.refundRate}</p>
						</div>
						<div>
							<h2 className="text-2xl text-black">
								return Rate
							</h2>
							<p>{artisansmatrices.metrics.returnRate}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
