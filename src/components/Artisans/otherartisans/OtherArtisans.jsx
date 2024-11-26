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
	const [artisans, setArtisans] = useState(null);

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
				"res in getcurrent artisans in other artisans",
				res.data.data.artisan
			);
			setArtisans(res.data.data.artisan);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		getCurrentArtisans();
	}, [getCurrentArtisans]);
	return (
		<div className="text-black">
			<h1>Other Artisans</h1>
			<p>{artisans?.fullName}</p>
			<p>{artisans?.email}</p>
			<p>{artisans?.about}</p>
			<p>{artisans?.experience}</p>
			<p>{artisans?.GSTIN}</p>
			<img src={artisans?.avatar} alt="" />
		</div>
	);
}

export default OtherArtisans;
