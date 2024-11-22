import { PenIcon } from "lucide-react";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useAuth } from "../../../useContext/loginContext";
import axios from "axios";

function UserProfile() {
	const [artisans, setArtisans] = useState(null);
	const [user, setuser] = useState(null);

	const [logIn, setLogIn] = useState(false);
	const [artisanslogin, setartisanslogin] = useState(false);
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
			setartisanslogin(true);
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
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("res in getcurrent artisans", res.data);
			setuser(res.data.data);
			console.log("user=", user);

			setLogIn(true);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem("artisansaccessToken")) {
			getCurrentArtisans();
		}
		if (localStorage.getItem("accessToken")) {
			getCurrentUser();
		}
	}, [getCurrentArtisans]);
	return (
		<div>
			<div className="flex justify-center m-[3rem] gap-32">
				{artisanslogin && (
					<img
						className="h-[10rem] w-[10rem] "
						src={artisans.avatar}
						alt=""
					/>
				)}
				{logIn && (
					<img
						className="h-[10rem] w-[10rem] "
						src={user.avatar}
						alt=""
					/>
				)}

				<div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Full Name :
						</div>
						<div className="uppercase">
							{logIn && user.fullName}
							{artisanslogin && artisans.fullName}
						</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							User Name :
						</div>
						<div>
							{logIn && user.username}
							{artisanslogin && artisans.username}
						</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Phone No. :
						</div>
						<div>
							{logIn && user.phoneNo}
							{artisanslogin && artisans.phoneNo}
						</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Address :
						</div>
						<div>Address of User</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Email :
						</div>
						<div>
							{logIn && user.email}
							{artisanslogin && artisans.email}
						</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							DOB :
						</div>
						<div>
							{logIn && user.DOB}
							{artisanslogin && artisans.DOB}
						</div>
					</div>
				</div>
				<button className="font-bold flex gap-3 text-xl">
					Edit Profile <PenIcon />{" "}
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
