import { PenIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../useContext/loginContext";
import axios from "axios";
import { useAuthArtisans } from "../../../useContext/ArtisansContext";

function UserProfile() {
  const [artisans, setArtisans] = useState(null);
  const [user, setuser] = useState(null);
  const [logIn, setLogIn] = useState(false);
  const [artisanslogin, setartisanslogin] = useState(false);
    const { loggedIn, setloggedIn } = useAuth();
    const { artisansloggedIn, setartisansloggedIn } = useAuthArtisans();
  const backendurl = import.meta.env.VITE_URL;
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
      console.log("res in getcurrent artisans", res.data);
      setArtisans(res.data.data);
      setartisanslogin(true);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
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
      console.log("res in getcurrent user", res.data);
      setuser(res.data.data);
      console.log("user=", user);

      setLogIn(true);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const getCurrentUserAddress = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/address`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("addres in", res.data);
      setuser({ ...user, address: res.data.data });
    } catch (error) {
      console.log("Error in getting user address", error);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("artisansaccessToken")) {
      getCurrentArtisans();
    }
    if (localStorage.getItem("accessToken")) {
      getCurrentUser();
      getCurrentUserAddress();
    }
  }, []);
  return (
    <div>
      <div className="flex justify-center m-[3rem] gap-32">
        {artisansloggedIn && (
          <img className="h-[10rem] w-[10rem] " src={artisans?.avatar} alt="" />
        )}
        {loggedIn && (
          <img className="h-[10rem] w-[10rem] " src={user?.avatar} alt="" />
        )}

        <div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Full Name :</div>
            <div className="uppercase">
              {loggedIn && user?.fullName}
              {artisansloggedIn && artisans?.fullName}
            </div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">User Name :</div>
            <div>
              {loggedIn && user?.username}
              {artisansloggedIn && artisans?.username}
            </div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Phone No. :</div>
            <div>
              {loggedIn && user?.phoneNo}
              {artisansloggedIn && artisans?.phoneNo}
            </div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Address :</div>
            <div>{user?.address?.address}</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Email :</div>
            <div>
              {loggedIn && user?.email}
              {artisansloggedIn && artisans?.email}
            </div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">DOB :</div>
            <div>
              {loggedIn && user?.DOB?.slice(0, 10)}
              {artisansloggedIn && artisans?.DOB?.slice(0, 10)}
            </div>
          </div>
        </div>
        <button className="font-bold flex gap-3 text-xl">
          Edit Profile <PenIcon />{" "}
        </button>
      </div>
      <div className="flex justify-center gap-10 my-10 mx-[10rem]">
        <div className="p-4 bg-three w-[10rem] text-center">Orders</div>
        <div className="p-4 bg-three w-[10rem] text-center">Wishlist</div>
        <div className="p-4 bg-three w-[10rem] text-center">
          Recommendations
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
