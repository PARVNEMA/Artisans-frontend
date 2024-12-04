import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostCoupon from "../coupons/PostCoupon";
import GetCoupons from "../coupons/GetCoupons";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [currentartisans, setcurrentartisans] = useState([]);
  const [bannedArtisans, setbannedArtisans] = useState([]);
  const navigate = useNavigate();
  const [totalArtisans, setTotalArtisans] = useState(0);
  const [currentusers, setcurrentusers] = useState(0);

  const backendurl = import.meta.env.VITE_URL;
  const getProductAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/product-analytics`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current product analytics=", res.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const getSalesAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/sales-analytics`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Sales analytics=", res.data.data);
    } catch (error) {
      console.log("Error", error);
      // toast.error(error.message);
    }
  }, []);
  const getFinanceAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/financial-overview`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Finance analytics=", res.data.data);
    } catch (error) {
      console.log("Error", error);
      // toast.error(error.message);
    }
  }, []);
  var index = 1;
  const getActiveArtisansDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/registered-artisans`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Active Artisans analytics=", res.data.data);
      setTotalArtisans(res.data.data.totalArtisans);
      setcurrentartisans(res.data.data.activeArtisans);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);
  const getActiveUserDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/registered-customers`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Active User analytics=", res.data.data);
      setcurrentusers(res.data.data);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);
  const getBannedArtisans = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/admin/nastrigo/getDisabledArtisanAccount`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Ban Active User analytics=", res.data.data);
      setbannedArtisans(res.data.data);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);
  const adminlogout = useCallback(async () => {
    try {
      const res = await axios.post(
        `${backendurl}/admin/nastrigo/logout`,
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("logout admin", res.data.data);
      // setcurrentusers(res.data.data);
      localStorage.removeItem("adminaccessToken");
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);

  const BanArtisan = useCallback(async (artisanId) => {
    try {
      const res = await axios.put(
        `${backendurl}/admin/nastrigo/disable/${artisanId}`,
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Active Artisans ban=", res.data.data);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);
  const unBanArtisan = useCallback(async (artisanId) => {
    try {
      const res = await axios.put(
        `${backendurl}/admin/nastrigo/activate/${artisanId}`,
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
          },
        }
      );
      console.log("current Active Artisans unban=", res.data.data);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    getProductAnalytics();
    getSalesAnalytics();
    getFinanceAnalytics();
    getActiveArtisansDetails();
    getActiveUserDetails();
    getBannedArtisans();
  }, []);

  return (
    <div className="min-h-screen bg-one p-8">
      {" "}
      <div className="flex flex-col relative lg:flex-row justify-center items-center mb-8">
        {" "}
        <h1 className="text-3xl lg:text-4xl text-three text-center font-bold mb-4 lg:mb-0">
          Admin Home Main
        </h1>{" "}
        <button
          onClick={adminlogout}
          className="py-2 px-4 absolute top-2 right-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          {" "}
          Logout{" "}
        </button>{" "}
      </div>{" "}
      <div className="overflow-x-auto mb-12">
        {" "}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          {" "}
          <thead className="bg-four text-white">
            {" "}
            <tr>
              {" "}
              <th className="py-3 px-6 font-semibold uppercase">SNO</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">ID</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Avatar</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Full Name</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Username</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Email</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Phone No</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Action</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {currentartisans.map((artisan, i) => (
              <tr
                key={artisan._id}
                className="bg-white border-b hover:bg-gray-100 transition-all"
              >
                {" "}
                <td className="py-3 px-6 border">{i + 1}</td>{" "}
                <td className="py-3 px-6 border">{artisan._id}</td>{" "}
                <td className="py-3 px-6 border flex justify-center">
                  {" "}
                  <img
                    src={artisan.avatar}
                    alt=""
                    className="h-16 w-16 rounded-full"
                  />{" "}
                </td>{" "}
                <td className="py-3 px-6 border">{artisan.fullName}</td>{" "}
                <td className="py-3 px-6 border">{artisan.username}</td>{" "}
                <td className="py-3 px-6 border">{artisan.email}</td>{" "}
                <td className="py-3 px-6 border">{artisan.phoneNo}</td>{" "}
                <td className="py-3 px-6 border">
                  {" "}
                  <button
                    className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    onClick={() => BanArtisan(artisan._id)}
                  >
                    {" "}
                    Ban{" "}
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <div className="text-center mb-12">
        {" "}
        <h1 className="text-3xl text-three lg:text-4xl font-bold mb-2">
          Total user count: {currentusers}
        </h1>{" "}
        <h1 className="text-3xl text-three lg:text-4xl font-bold mb-2">
          Total artisans count: {totalArtisans}
        </h1>{" "}
        <h1 className="text-3xl text-three lg:text-4xl font-bold mb-2">
          Active artisans count: {currentartisans.length}
        </h1>{" "}
      </div>{" "}
      <div className="flex justify-center mb-12">
        {" "}
        <GetCoupons />{" "}
      </div>{" "}
      <div className="flex justify-center mb-12">
        {" "}
        <PostCoupon />{" "}
      </div>{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          {" "}
          <thead className="bg-four text-white">
            {" "}
            <tr>
              {" "}
              <th className="py-3 px-6 font-semibold uppercase">SNO</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">ID</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Avatar</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Full Name</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Username</th>{" "}
              <th className="py-3 px-6 font-semibold uppercase">Email</th>{" "}
              {/* <th className="py-3 px-6 font-semibold uppercase">Phone No</th>{" "} */}
              <th className="py-3 px-6 font-semibold uppercase">Action</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {bannedArtisans.map((artisan, i) => (
              <tr
                key={artisan._id}
                className="bg-white border-b hover:bg-gray-100 transition-all"
              >
                {" "}
                <td className="py-3 px-6 border">{i + 1}</td>{" "}
                <td className="py-3 px-6 border">{artisan._id}</td>{" "}
                <td className="py-3 px-6 border flex justify-center">
                  {" "}
                  <img
                    src={artisan.avatar}
                    alt=""
                    className="h-16 w-16 rounded-full"
                  />{" "}
                </td>{" "}
                <td className="py-3 px-6 border">{artisan.fullName}</td>{" "}
                <td className="py-3 px-6 border">{artisan.username}</td>{" "}
                <td className="py-3 px-6 border">{artisan.email}</td>{" "}
                <td className="py-3 px-6 border">
                  {" "}
                  <button
                    className="py-1 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    onClick={() => unBanArtisan(artisan._id)}
                  >
                    {" "}
                    Unban{" "}
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
}
export default AdminHome;
