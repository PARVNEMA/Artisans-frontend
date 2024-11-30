import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { io } from "socket.io-client";
import ChatRoom from "./Chatroom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chatapp = () => {
	const { artisanId } = useParams();
	const [roomId, setRoomId] = useState("");
	const [userId, setUserId] = useState("");
	const [socket, setSocket] = useState(null);

	const backendurl = import.meta.env.VITE_URL;

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
			console.log(
				"res in getcurrent artisans chatapp",
				res.data
			);
			setUserId(res.data.data._id);
		} catch (error) {
			console.log("Error", error);
		}
	}, [backendurl]);

	// Set up the socket connection when the app starts
	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	useEffect(() => {
		const socketInstance = io(`${backendurl}`, {
			transports: ["websocket"], // ensures that websocket transport is used
		});

		// Store the socket instance in state
		setSocket(socketInstance);

		// Clean up socket connection on component unmount
		return () => {
			socketInstance.disconnect();
		};
	}, [backendurl]);

	const handleJoinRoom = () => {
		if (!artisanId) {
			console.error("Artisan ID ");
			return;
		}
		if (!userId) {
			console.error("User ID");
			return;
		}
		const newRoomId = `${artisanId}${userId}`;
		console.log("roomid=", newRoomId);
		setRoomId(newRoomId);
		if (socket) {
			socket.emit("join_room", newRoomId);
		}
	};

	return (
		<div>
			<button onClick={handleJoinRoom}>Join Chat</button>
			{roomId && socket && (
				<ChatRoom
					socket={socket}
					roomId={roomId}
					userId={userId}
				/>
			)}
		</div>
	);
};

export default Chatapp;
