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

	// const getCurrentUser = async () => {
	// 	const res = await axios.get(
	// 		`${backendurl}/artisans/current-user`,
	// 		{
	// 			withCredentials: true, // Ensure cookies are included in the request
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem(
	// 					"artisansaccessToken"
	// 				)}`,
	// 			},
	// 		}
	// 	);
	// 	console.log("current artisans", res.data);
	// 	setartisans(res.data.data);
	// 	if (res.data) {
	// 		dispatch({ type: "LOGIN", payload: res.data.data });
	// 	}
	// };

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
	// useEffect(() => {
	// 	getCurrentUser();
	// }, []);
	console.log(state);

	useEffect(() => {
		console.log("State on mount or update:", state);
		if (state.isLoggedIn) {
			console.log(
				"User is logged in, fetching products..."
			);
			getArtisansProduct();
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
		</div>
	);
}

export default Dashboard;
