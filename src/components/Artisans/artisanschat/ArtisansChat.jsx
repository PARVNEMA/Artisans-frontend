import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import ChatPage from "../../chatpage/ChatPage"; // Import the ChatPage component

function ArtisansChat() {
  const backendurl = import.meta.env.VITE_URL;
  const [roomids, setroomids] = useState([]);
  const [artisans, setartisans] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);

  const getArtisansChat = useCallback(async () => {
    try {
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
      setroomids(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [artisans]);

  const getCurrentArtisans = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/artisans/current-user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "artisansaccessToken"
          )}`,
        },
      });
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
      getArtisansChat();
    }
  }, [artisans, getArtisansChat]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-four bg-opacity-45 p-4 overflow-y-auto">
        <h1 className="text-2xl font-extrabold text-center text-three mb-8">
          Chats
        </h1>
        <div className="space-y-4">
          {roomids?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
              onClick={() => setSelectedRoom(item)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item?.user?.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-bold text-three">
                    {item?.user?.fullName}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">
                    {item?.mostRecentMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white p-4">
        {selectedRoom ? (
          <ChatPage
            artisanId={artisans._id}
            userId={selectedRoom?.user?._id}
            productId={selectedRoom?.mostRecentMessage?.productId}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtisansChat;
