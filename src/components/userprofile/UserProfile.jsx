import { PenIcon } from "lucide-react";
import React from "react";
import { useAuth } from "../../../useContext/loginContext";

function UserProfile() {
	const { dispatch, state } = useAuth();
	return (
		<div>
			<div className="flex justify-center m-[3rem] gap-32">
				<img
					className="h-[10rem] w-[10rem] "
					src={state.userData.avatar}
					alt=""
				/>
				<div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Full Name :
						</div>
						<div className="uppercase">{state.userData.fullName}</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							User Name :
						</div>
						<div>{state.userData.username}</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							Phone No. :
						</div>
						<div>{state.userData.phoneNo}</div>
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
						<div>{state.userData.email}</div>
					</div>
					<div className="flex">
						<div className="text-[1rem] font-bold mr-3">
							DOB :
						</div>
						<div>{state.userData.DOB}</div>
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
