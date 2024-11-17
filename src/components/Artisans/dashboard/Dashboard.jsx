import axios from "axios";
import React, { useEffect } from "react";

import { useArtisansAuth } from "../../../../useContext/ArtisansContext.jsx";
import { Link } from "react-router-dom";

function Dashboard() {
	const { dispatch, state } = useArtisansAuth();
	const backendurl = import.meta.env.VITE_URL;
	const getCurrentUser = async () => {
		const res = await axios.get(
			`${backendurl}/artisans/current-user`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"artisansaccessToken"
					)}`,
				},
			}
		);
		console.log("current artisans", res.data);
		if (res.data) {
			dispatch({ type: "LOGIN", payload: res.data.data });
		}
	};
	useEffect(() => {
		getCurrentUser();
	}, []);

	const logout = async () => {
		const res = await axios.post(
			`${backendurl}/artisans/logout`,
			null,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"artisansaccessToken"
					)}`,
				},
			}
		);
		if (res) {
			dispatch({ type: "LOGOUT" });
		}

		localStorage.removeItem("artisansaccessToken");

		console.log("logout", res);
	};

	return (
		<div>
			<div>Dashboard{state.artisansData.fullName}</div>
			<br />
			<button onClick={logout}>Logout</button>
			<Link to={"/artisans/productlisting"}>
				<button className="bg-primary">
					ProductListing
				</button>
			</Link>
		</div>
	);
}

export default Dashboard;
