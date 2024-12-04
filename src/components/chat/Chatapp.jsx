import axios from "axios";
import { io } from "socket.io-client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      const res = await axios.get(`${backendurl}/customers/current-user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "artisansaccessToken"
          )}`,
        },
      });
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
    if (!artisanId || !userId) {
      console.error("Artisan ID or User ID is undefined");
      return;
    }
    const newRoomId = `${artisanId}${userId}`;
    setRoomId(newRoomId);
    if (socket) {
      socket.emit("join_room", newRoomId);
    }
  };

  const getRoomMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/messages/${roomId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
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
        setMessages((prevMessages) => [...prevMessages, message]);
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
    <div className="p-6 bg-one min-h-screen">
      {userId ? (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleJoinRoom}
            className="mb-4 px-6 py-3 font-semibold tracking-wide bg-three text-white rounded-md hover:bg-opacity-85 transition duration-300"
          >
            Join Chat
          </button>
          {roomId && socket && (
            <div>
              <div className="bg-white rounded-md shadow-md p-4 mb-4">
                <div className="overflow-y-auto h-60">
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <span className="font-bold text-three">
                        {msg.senderId === userId ? "You" : "Artisan"}:
                      </span>
                      <span className="ml-2">{msg.message}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-three"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={sendMessage}
                    className="ml-2 px-6 py-2 bg-three text-white rounded-md hover:bg-opacity-85 transition duration-300"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-three font-semibold">
          Loading user information...
        </p>
      )}
    </div>
  );
};

export default Chatapp;
