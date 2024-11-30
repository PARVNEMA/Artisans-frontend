import { PenIcon } from "lucide-react";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useAuth } from "../../../useContext/loginContext";
import axios from "axios";
import { useAuthArtisans } from "../../../useContext/ArtisansContext";

function UserProfile() {
	const [artisans, setArtisans] = useState(null);
	const [user, setuser] = useState(null);
	const { loggedIn, setloggedIn } = useAuth();
	const { artisansloggedIn, setartisansloggedIn } =
		useAuthArtisans();
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
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			console.log("addres in", res.data);
			setuser((prevUser) => ({
				...prevUser,
				address: res.data.data,
			}));
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
	}, [
		getCurrentUser,
		getCurrentUserAddress,
		getCurrentArtisans,
	]);

	return (
		<div>
			<div className="flex justify-center m-[3rem] gap-32">
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
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									Full Name :
								</div>
								<div className="uppercase">
									{user?.fullName || artisans?.fullName}
								</div>
							</div>
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									User Name :
								</div>
								<div>
									{loggedIn
										? user?.username
										: artisans?.username}
								</div>
							</div>
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									Phone No. :
								</div>
								<div>
									{loggedIn
										? user?.phoneNo
										: artisans?.phoneNo}
								</div>
							</div>
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									Address :
								</div>
								<div>{user?.address?.address}</div>
							</div>
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									Email :
								</div>
								<div>
									{loggedIn ? user?.email : artisans?.email}
								</div>
							</div>
							<div className="flex">
								<div className="text-[1rem] font-bold mr-3">
									DOB :
								</div>
								<div>
									{loggedIn
										? user?.DOB?.slice(0, 10)
										: artisans?.DOB?.slice(0, 10)}
								</div>
							</div>
						</>
					) : (
						<div>Loading...</div>
					)}
				</div>
				<button className="font-bold flex gap-3 text-xl">
					Edit Profile <PenIcon />
				</button>
			</div>
			<div className="flex justify-center gap-10 my-10 mx-[10rem]">
				<div className="p-4 bg-three w-[10rem] text-center">
					Orders
				</div>
				<div className="p-4 bg-three w-[10rem] text-center">
					Wishlist
				</div>
				<div className="p-4 bg-three w-[10rem] text-center">
					Recommendations
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
