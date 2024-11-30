import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import Message from "./Message";
import axios from "axios";

const ChatRoom = ({ socket, roomId, userId }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const backendurl = import.meta.env.VITE_URL;
	// Listen for new messages from the server
	useEffect(() => {
		socket.on("receive_message", (message) => {
			setMessages((prevMessages) => [
				...prevMessages,
				message,
			]);
		});

		// Load previous messages on room join
		socket.emit("join_room", roomId);

		return () => {
			socket.off("receive_message");
		};
	}, [socket, roomId]);

	// Send a new message to the server
	const sendMessage = () => {
		if (newMessage.trim()) {
			socket.emit("send_message", {
				roomId: roomId,
				senderId: userId,
				receiverId: "receiverId", // Define the receiver ID as needed
				message: newMessage,
			});
			setNewMessage(""); // Clear input after sending
		}
	};

	const getRoomMessages = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/messages`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log(
				"res in getcurrent artisans chatapp",
				res.data
			);
			setMessages(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, [backendurl]);

	useEffect(() => {
		getRoomMessages();
	}, []);

	return (
		<div>
			<div>
				<h2>Chat Room: {roomId}</h2>
				<div>
					{messages.map((msg, index) => (
						<div key={index}>
							<strong>{msg.senderId}:</strong> {msg.message}
							<Message
								senderId={msg.senderId}
								message={msg.message}
							/>
						</div>
					))}
				</div>
			</div>

			<div>
				<input
					type="text"
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default ChatRoom;
