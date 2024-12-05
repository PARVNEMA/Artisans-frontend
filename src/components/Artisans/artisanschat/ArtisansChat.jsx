import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";
import { useAuthArtisans } from "../../../../useContext/ArtisansContext";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

function ArtisansChat() {
	const backendurl = import.meta.env.VITE_URL;
	// const {
	// 	artisansloggedIn,
	// 	setartisansloggedIn,
	// 	artisans,
	// 	setArtisans,
	// } = useAuthArtisans();
	const [roomids, setroomids] = useState([]);
	const [artisans, setartisans] = useState({});

	// const socket = io(
	// 	import.meta.env.VITE__URL || "http://localhost:8000"
	// );
	const getArtisansChat = useCallback(async () => {
		try {
			console.log("artisans=", artisans);
			if (!artisans?._id) {
				console.error("Artisan ID is not available");
				return;
			}
			const res = await axios.get(
				`${backendurl}/messages/userChats/${artisans._id}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("res in chat of artisans=", res.data);
			setroomids(res.data);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, [artisans]); // Add `artisans` as a dependency

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
			setartisans(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	useEffect(() => {
		getCurrentArtisans();
	}, []);

	useEffect(() => {
		if (artisans?._id) {
			// Only call `getArtisansChat` if `artisans._id` is available
			getArtisansChat();
		}
	}, [artisans, getArtisansChat]); // Run when `artisans` changes

	return (
		<div>
			ArtisansChat
			{roomids?.map((item) => (
				// <ChatRoom
				// 	socket={socket}
				// 	roomId={roomid}
				// 	userId={artisans._id}
				// />
				<div>
					{item?.roomId} -{" "}
					<div>
						<div>
							Username:<p>{item?.user?.fullName}</p>
							<img
								src={item?.user?.avatar}
								alt=""
								className="w-20 h-20"
							/>
						</div>
						UserMessage:{item?.mostRecentMessage?.message}
					</div>
					<div>
						<Link
							to={`/chat/${item?.user?._id}/${artisans?._id}/${item?.mostRecentMessage?.productId}`}
						>
							<div className="bg-two flex items-center justify-center px-8 py-4 hover:bg-gray-900 text-white border border-gray-800 text-base rounded-lg">
								Chat
							</div>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}

export default ArtisansChat;
