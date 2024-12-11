import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Link } from "react-router-dom";

function YourOrders() {
  const { currency } = useContext(CurrencyContext);
  const backendurl = import.meta.env.VITE_URL;
  const [orderProducts, setorderProducts] = useState([]);

  const showBill = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/order`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("get current order Items", res.data.data);
      setorderProducts(res.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  const cancelProductOrder = useCallback(
    async (orderId, orderItemId) => {
      console.log("orderId", orderId);
      console.log("orderItemId", orderItemId);

      try {
        const res = await axios.delete(
          `${backendurl}/order/cancel-order/${orderId}/${orderItemId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("product order cancelled", res.data);
        toast.success("Product order cancelled");
        showBill();
      } catch (error) {
        console.log("Error", error);
        toast.error(error.message);
      }
    },
    [showBill]
  );

  useEffect(() => {
    showBill();
  }, [showBill]);

  return (
    <div className="mx-10">
      <div className="w-[85%] pl-[8rem]">
        <h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
          Your Orders
        </h1>
      </div>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-four text-white">
            <tr>
              <th className="py-3 px-6 font-semibold uppercase">SNo.</th>
              <th className="py-3 px-6 font-semibold uppercase">Order Date</th>
              <th className="py-3 px-6 font-semibold uppercase">Title</th>
              <th className="py-3 px-6 font-semibold uppercase">Description</th>
              <th className="py-3 px-6 font-semibold uppercase">Price</th>
              <th className="py-3 px-6 font-semibold uppercase">Status</th>
              <th className="py-3 px-6 font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts?.map((item,index) => (
              <React.Fragment key={item._id}>
                {item?.items?.map((prod) => (
                  <tr
                    key={prod.orderItemId}
                    className="bg-white border-b hover:bg-gray-100 transition-all"
                  >
                    <td className="py-3 px-6 text-center border">
                      {index+1}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {item?.orderDate?.slice(0, 10)}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {prod?.productId?.title}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {prod?.productId?.description}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {currency === "INR"
                        ? "₹"
                        : currency === "USD"
                        ? "$"
                        : "€"}{" "}
                      {prod?.productId?.price}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {prod?.status}
                    </td>
                    <td className="py-3 px-6 text-center border">
                      {prod?.status === "Pending" && (
                        <button
                          className="btn btn-error"
                          onClick={() =>
                            cancelProductOrder(item._id, prod.orderItemId)
                          }
                        >
                          Cancel Order
                        </button>
                      )}
                      {prod?.status === "Delivered" && (
                        <Link
                          to={`/returnorder/${item?._id}/${prod?.orderItemId}/`}
                        >
                          <button className="btn btn-error">
                            Return Order
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100">
                  <td
                    colSpan={5}
                    className="py-3 px-6 col-span-1 text-center font-bold border"
                  >
                    {""}{" "}
                  </td>
                  <td className="py-3 px-6 text-center font-bold border">
                    Total Order Price:
                  </td>
                  <td
                    className="py-3 px-6 text-center font-bold border"
                  >
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"}{""}
                    {item?.totalPrice}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td colSpan={5} className="py-3 px-6 text-center font-bold border">{""}
                  </td>
                  <td className="py-3 px-6 text-center font-bold border">
                    Shipping Charges:
                  </td>
                  <td
                    className="py-3 px-6 text-center font-bold border"
                  >
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"}{" "}
                    {item?.shippingCharges}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="py-3"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YourOrders;
