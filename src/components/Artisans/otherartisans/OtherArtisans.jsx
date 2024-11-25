import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";

function OtherArtisans() {
	let { artisanid } = useParams();
	const backendurl = import.meta.env.VITE_URL;
	const [artisans, setArtisans] = useState({});
	const [artisansmatrices, setArtisansMatrices] =
		useState(null);

	const getCurrentArtisans = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/artisans/detail/${artisanid}`,
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
				" getcurrent artisans in other artisans",
				res.data.data
			);
			setArtisans(res.data.data.artisan);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	const getArtisansSellerMetrices =
		useCallback(async () => {
			try {
				const res = await axios.get(
					`${backendurl}/artisans/matrices/${artisanid}`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log("current artisans metrices", res.data);
				setArtisansMatrices(res.data.data.metrics);
			} catch (error) {
				console.error("error in dashboard ", error);
			}
		}, [artisans?._id]);
	useEffect(() => {
		getCurrentArtisans();
		getArtisansSellerMetrices();
	}, []);
	return (
		<div className="text-black">
			<h1>Other Artisans</h1>
			<p>{artisans?.fullName}</p>
			<p>{artisans?.email}</p>
			<p>{artisans?.about}</p>
			<p>{artisans?.experience}</p>
			<p>{artisans?.GSTIN}</p>
			<img src={artisans?.avatar} alt="" />

			<div>
				<p>{artisansmatrices?.customerSatisfaction}</p>
				<p>{artisansmatrices?.disputeRate}</p>
				<p>{artisansmatrices?.productSellingRate}</p>
				<p>{artisansmatrices?.refundRate}</p>
				<p>{artisansmatrices?.returnRate}</p>
			</div>
		</div>
	);
}

export default OtherArtisans;
