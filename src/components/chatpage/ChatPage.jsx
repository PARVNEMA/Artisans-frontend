import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const backendurl = import.meta.env.VITE_URL;

// Initialize socket connection outside the component
const socket = io(
	import.meta.env.VITE_SOCKET_URL || "http://localhost:8000"
);

const ChatPage = () => {
	const { artisanId, userId, productId } = useParams(); // Extract artisanId and userId from the URL
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [product, setproduct] = useState({});

	const getproductsdetails = async () => {
		const res = await axios.get(
			`${backendurl}/products/detail/${id}?currency=${currency}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in detailed product  list", res.data);
		setproduct(res.data.data);
	};

	// Generate a consistent room ID

	useEffect(() => {
		getproductsdetails();
	}, []);

	const generateRoomId = (artisanId, userId) => {
		const sortedIds = [artisanId, userId, productId].sort();
		return `${sortedIds[0]}-${sortedIds[1]}-${sortedIds[2]}`;
	};

	// Use generated roomId
	const roomId = generateRoomId(artisanId, userId);

	useEffect(() => {
		// Join the generated room ID
		socket.emit("join_room", roomId);
		console.log(`User joined room: ${roomId}`);

		// Listen for previous messages from the server
		socket.on(
			"load_previous_messages",
			(loadedMessages) => {
				setMessages(loadedMessages);
			}
		);

		// Listen for new messages from the server
		socket.on("receive_message", (newMessage) => {
			setMessages((prevMessages) => [
				...prevMessages,
				newMessage,
			]);
		});

		// Cleanup on component unmount
		return () => {
			socket.emit("leave_room", roomId); // Inform the server about leaving the room
			socket.off("load_previous_messages");
			socket.off("receive_message");
		};
	}, [roomId]);

	const sendMessage = () => {
		if (!message.trim()) return; // Prevent sending empty messages

		const data = {
			roomId,
			senderId: userId,
			receiverId: artisanId,
			message,
			timestamp: new Date(),
		};

		// Send message to the server
		socket.emit("send_message", data);

		// Update local state
		setMessages((prevMessages) => [...prevMessages, data]);
		setMessage(""); // Clear the input field
	};

	return (
		<div className="chat-container">
			<div className="chat-header">Chat Room</div>
			<div className="chat-messages">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`message ${
							msg.senderId === userId ? "sent" : "received"
						}`}
					>
						<span>{msg.message}</span>
					</div>
				))}
			</div>
			<div className="chat-input-container">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message"
					className="chat-input"
				/>
				<button
					onClick={sendMessage}
					className="send-button"
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
