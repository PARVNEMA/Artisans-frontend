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
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

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

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	useEffect(() => {
		const socketInstance = io(`${backendurl}`, {
			transports: ["websocket"], // ensures that websocket transport is used
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, [backendurl]);

	const handleJoinRoom = () => {
		if (!artisanId) {
			console.error("Artisan ID is undefined");
			return;
		}
		if (!userId) {
			console.error("User ID is undefined");
			return;
		}
		const newRoomId = `${artisanId}${userId}`;
		console.log("roomid=", newRoomId);
		setRoomId(newRoomId);
		if (socket) {
			socket.emit("join_room", newRoomId);
		}
	};

	const getRoomMessages = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/messages/${roomId}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("res in getRoomMessages", res.data);
			setMessages(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, [backendurl, roomId]);

	useEffect(() => {
		if (roomId) {
			getRoomMessages();
		}
	}, [getRoomMessages, roomId]);

	useEffect(() => {
		if (socket) {
			socket.on("receive_message", (message) => {
				setMessages((prevMessages) => [
					...prevMessages,
					message,
				]);
			});

			return () => {
				socket.off("receive_message");
			};
		}
	}, [socket]);

	const sendMessage = () => {
		if (newMessage.trim()) {
			socket.emit("send_message", {
				roomId: roomId,
				senderId: userId,
				receiverId: artisanId, // Ensure correct receiverId
				message: newMessage,
			});
			setNewMessage(""); // Clear input after sending
		}
	};

	return (
		<div>
			{userId ? (
				<>
					<button onClick={handleJoinRoom}>
						Join Chat
					</button>
					{roomId && socket && (
						<>
							<ChatRoom
								socket={socket}
								roomId={roomId}
								userId={userId}
							/>
							{/* <div>
								{messages.map((msg, index) => (
									<div key={index}>{msg.message}</div>
								))}
								<input
									type="text"
									value={newMessage}
									onChange={(e) =>
										setNewMessage(e.target.value)
									}
								/>
								<button onClick={sendMessage}>Send</button>
							</div> */}
						</>
					)}
				</>
			) : (
				<p>Loading user information...</p>
			)}
		</div>
	);
};

export default Chatapp;
