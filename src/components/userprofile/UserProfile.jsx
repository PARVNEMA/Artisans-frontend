import { PenIcon } from "lucide-react";
import React from "react";

function UserProfile() {
  return (
    <div>
      <div className="flex justify-center m-[3rem] gap-32">
        <img className="h-[6rem] w-[14rem] " src="/images/logo1.jpg" alt="" />
        <div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Full Name :</div>
            <div>Full Name of User</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">User Name :</div>
            <div>User Name</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Phone No. :</div>
            <div>Phone number of User</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Address :</div>
            <div>Address of User</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">Email :</div>
            <div>Email of User</div>
          </div>
          <div className="flex">
            <div className="text-[1rem] font-bold mr-3">DOB :</div>
            <div>DOB of User</div>
          </div>
        </div>
        <button className="font-bold flex gap-3 text-xl">Edit Profile <PenIcon/> </button>
      </div>
      <div className="flex justify-center gap-10 my-10 mx-[10rem]">
        <div className="p-4 bg-primary w-[10rem] text-center">Orders</div>
        <div className="p-4 bg-primary w-[10rem] text-center">Wishlist</div>
        <div className="p-4 bg-primary w-[10rem] text-center">Recommendations</div>
      </div>
    </div>
  );
}

export default UserProfile;
