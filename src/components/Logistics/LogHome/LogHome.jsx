import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogHome() {
  const backendurl = import.meta.env.VITE_URL;
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getLogisticsOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/logistics/products`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "artisansaccessToken"
          )}`,
        },
      });
      console.log("logistics orders=", res.data.data);
      setOrders(res.data.data);
    } catch (error) {
      console.error("error in logistics ", error);
    }
  }, [backendurl]);

  const adminLogout = useCallback(async () => {
    try {
      const res = await axios.post(`${backendurl}/logistic/logout`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "logisticaccessToken"
          )}`,
        },
      });
      console.log("logout logistic", res.data.data);
      localStorage.removeItem("logisticaccessToken");
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  }, [backendurl, navigate]);

  useEffect(() => {
    getLogisticsOrders();
  }, [getLogisticsOrders]);

  return (
    <div>
      <div className="flex items-center w-full">
        <div className="w-[85%] pl-[8rem]">
          <h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
            Logistics Orders
          </h1>
          <button onClick={adminLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>

      {/* Order Table */}
      <div className="flex flex-col">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-three text-white">
            <tr>
              <th className="py-3 px-6 text-left font-semibold uppercase">
                SNO
              </th>
              <th className="py-3 px-6 text-left font-semibold uppercase">
                Order ID
              </th>
              <th className="py-3 px-6 text-left font-semibold uppercase">
                Delivery Address
              </th>
              <th className="py-3 px-6 text-left font-semibold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product, index) => (
              <tr
                key={product.orderId}
                className="border-b hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => navigate(`/logistics/${product.orderId?._id}`)}
              >
                <td className="py-3 px-6 border">{index + 1}</td>
                <td className="py-3 px-6 border">{product?.orderId?._id}</td>
                <td className="py-3 px-6 border">
                  {product?.deliveryAddress?.city},{" "}
                  {product?.deliveryAddress?.state}
                </td>
                <td className="py-3 px-6 border">{product?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogHome;
