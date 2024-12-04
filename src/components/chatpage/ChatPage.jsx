import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendurl = import.meta.env.VITE_URL;

// Initialize socket connection outside the component
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8000");

const ChatPage = () => {
  const { artisanId, userId, productId } = useParams(); // Extract artisanId, userId, and productId from the URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({});
  const currency = "INR"; // Replace with actual currency context if available

  const getProductDetails = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/products/detail/${productId}?currency=${currency}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProduct(res.data.data);
	  console.log("res in chat list", res.data);
    } catch (error) {
      console.log("Error fetching product details", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

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
    socket.on("load_previous_messages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for new messages from the server
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
    <div className="p-6 bg-one min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="bg-three text-white py-4 px-6 rounded-md shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center">Chat Room</h1>
      </div>

      {/* Product Information */}
      <div className="bg-white rounded-md shadow-md p-4 mt-4 w-full max-w-4xl">
        <div className="flex items-center">
          <img
            src={product.images ? product.images[0] : ""}
            alt={product.title}
            className="h-24 w-24 rounded-md object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold text-three">{product.title}</h2>
            <p className="text-three">
              <b>Description: </b>
              {product.description}
            </p>
            <p className="text-gray-500">
              {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€ "}
              {product.price}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-md shadow-md p-4 mt-4 w-full max-w-4xl flex flex-col flex-grow">
        <div className="bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto mb-4 flex-grow">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 p-2 rounded ${
                  msg.senderId === userId
                    ? "bg-three text-white text-right"
                    : "bg-four text-three text-left"
                }`}
              >
                <span>{msg.message}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet</p>
          )}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:border-three"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-three text-white rounded-r-md hover:bg-opacity-85 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
