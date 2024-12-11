import { PenIcon } from "lucide-react";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useAuth } from "../../../useContext/loginContext";
import axios from "axios";
import { useAuthArtisans } from "../../../useContext/ArtisansContext";
import { Link } from "react-router-dom";

function UserProfile() {
	const [artisans, setArtisans] = useState(null);
	const [user, setuser] = useState(null);
	const { loggedIn, setloggedIn } = useAuth();
	const { artisansloggedIn, setartisansloggedIn } =
		useAuthArtisans();
	const [address, setaddress] = useState({});

	const backendurl = import.meta.env.VITE_URL;

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

	const getCurrentUser = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/customers/current-user`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("res in getcurrent user", res.data);
			setuser(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	const getCurrentUserAddress = useCallback(async () => {
		try {
			const res = await axios.get(`${backendurl}/address`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${
						localStorage.getItem("accessToken")
							? localStorage.getItem("accessToken")
							: localStorage.getItem("artisansaccessToken")
					}`,
				},
			});
			console.log(
				"addres in user/Artisan Profile",
				res.data
			);
			setaddress(res.data.data);
		} catch (error) {
			console.log("Error in getting user address", error);
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem("artisansaccessToken")) {
			getCurrentArtisans();
		}
		if (localStorage.getItem("accessToken")) {
			getCurrentUser().then(getCurrentUserAddress);
		}
		getCurrentUserAddress();
	}, [
		getCurrentUser,
		getCurrentUserAddress,
		getCurrentArtisans,
	]);

	return (
		<div>
			<div className="text-cente relative">
				{artisansloggedIn && (
					<Link
						to={"/artisans/updateprofile"}
						className="font-bold absolute right-10 flex gap-3 text-xl"
					>
						Edit Profile <PenIcon />
					</Link>
				)}
				<h1 className="text-5xl text-center font-extrabold uppercase text-three mt-10 mb-3">
					{" "}
					Welcome!! {artisans?.fullName ||
						user?.fullName}{" "}
				</h1>{" "}
				<p className="font-semibold text-center text-three">
					{" "}
					Here is your profile{" "}
				</p>{" "}
			</div>
			<div className="flex justify-center gap-8 mt-8">
				{artisans && (
					<img
						className="h-[10rem] w-[10rem]"
						src={artisans?.avatar}
						alt=""
					/>
				)}
				{user && (
					<img
						className="h-[10rem] w-[10rem]"
						src={user?.avatar}
						alt=""
					/>
				)}
				<div>
					{user || artisans ? (
						<>
							<table className="w-full text-lg text-start">
								<tr>
									<td className="font-bold">Full Name</td>
									<td className="uppercase">
										{" "}
										: {user?.fullName || artisans?.fullName}
									</td>
								</tr>
								<tr>
									<td className="font-bold">User Name</td>
									<td>
										{" "}
										:{" "}
										{loggedIn
											? user?.username
											: artisans?.username}
									</td>
								</tr>
								<tr>
									<td className="font-bold">Phone No.</td>
									<td>
										{" "}
										:{" "}
										{loggedIn
											? user?.phoneNo
											: artisans?.phoneNo}
									</td>
								</tr>
								<tr>
									<td className="font-bold">Address</td>
									<td>
										{" "}
										: {address?.zipCode} {address?.city}{" "}
										{address?.state} {address?.country}
									</td>
								</tr>
								<tr>
									<td className="font-bold">Email</td>
									<td>
										{" "}
										:{" "}
										{loggedIn
											? user?.email
											: artisans?.email}
									</td>
								</tr>
								<tr>
									<td className="font-bold">DOB</td>
									<td>
										:{" "}
										{loggedIn
											? user?.DOB?.slice(0, 10)
											: artisans?.DOB?.slice(0, 10)}
									</td>
								</tr>
								<tr>
									<td className="font-bold">GSTIN</td>
									<td>
										:{" "}
										{loggedIn ? user?.DOB : artisans?.GSTIN}
									</td>
								</tr>
							</table>
						</>
					) : (
						<div>Loading...</div>
					)}
				</div>
			</div>
			<div className="flex justify-center gap-10 my-10 mx-[10rem]">
				<Link to={"/myorders"}>
					<div className="p-4 bg-three text-white rounded-lg hover:bg-opacity-90 w-[10rem] text-center">
						Orders
					</div>
				</Link>
				<Link to={"/wishlist"}>
					<div className="p-4 bg-three text-white rounded-lg hover:bg-opacity-90 w-[10rem] text-center">
						Wishlist
					</div>
				</Link>
				<Link to={"/recommendation"}>
					<div className="p-4 bg-three text-white rounded-lg hover:bg-opacity-90 w-[10rem] text-center">
						Recommendations
					</div>
				</Link>
			</div>
		</div>
	);
}

export default UserProfile;
