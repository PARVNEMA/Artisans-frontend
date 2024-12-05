import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

function GetCoupons() {
  const backendurl = import.meta.env.VITE_URL;
  const [coupons, setCoupons] = useState([]);

  const getAllCoupons = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/admin/nastrigo/Coupans`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
        },
      });
      console.log("current coupons = ", res.data.data);
      setCoupons(res.data.data);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, [backendurl]);

  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center text-three mb-6">
        Available Coupons
      </h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              SNO
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Code
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Discount Type
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Discount Value
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Active
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Max Discount
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Min Purchase
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Valid From
            </th>
            <th className="py-2 px-4 bg-three text-white uppercase text-sm">
              Valid Till
            </th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon.code} className="bg-gray-50 odd:bg-white">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{coupon.code}</td>
              <td className="py-2 px-4 border-b text-center">
                {coupon.discountType}
              </td>
              <td className="py-2 px-4 border-b">{coupon.discountValue}</td>
              <td className="py-2 px-4 border-b">
                {coupon.isActive ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b">{coupon.maxDiscount}</td>
              <td className="py-2 px-4 border-b">{coupon.minPurchase}</td>
              <td className="py-2 px-4 border-b">
                {coupon.validFrom.slice(0, 10)}
              </td>
              <td className="py-2 px-4 border-b">
                {coupon.validTill.slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetCoupons;
