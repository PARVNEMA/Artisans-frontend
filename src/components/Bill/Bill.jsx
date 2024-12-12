import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bill() {
  const [cart, setcart] = useState([]);
  const [cartlength, setcartlength] = useState(1);
  const [totalprice, settotalprice] = useState(0);
  const { currency } = useContext(CurrencyContext);
  const [useraddress, setuseraddress] = useState({});
  const [coupon, setcoupon] = useState("");

  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_URL;

  const getCartItems = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/cart?currency=${currency}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setcart(res.data.data.items);
      settotalprice(res.data.data.totalCartPrice);
      setcartlength(res.data.message === "Your cart is empty." ? 0 : 1);
    } catch (error) {
      console.log("Error", error);
    }
  }, [currency]);

  const getCurrentUserAddress = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/address`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setuseraddress(res.data.data);
    } catch (error) {
      console.log("Error in getting user address", error);
    }
  }, []);
  const createBill = useCallback(async () => {
    try {
      // Make the backend call to create a Razorpay order
      const paymentRes = await axios.post(
        `${backendurl}/payment/payment`,
        { amount: totalprice },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      // Ensure the response contains the necessary fields
      const { amount, currency, _id } = paymentRes.data;
      console.log(paymentRes.data)
      if (!amount || !currency || _id) {
        throw new Error("Missing required payment details from server response.");
      }
      // Initialize Razorpay with the response details from the backend
      const options = {
        key: 'rzp_test_LQzqvbK2cWMGRg',  // Replace with your Razorpay key_id
        amount: amount,  // Amount in paise
        currency: currency,
        order_id: _id,
        name: "Your Order",
        description: "Order payment",
        handler: function (response) {
          // Handle successful payment here
          console.log("Payment Successful:", response);
          toast.success("Payment successful!");
          navigate("/order-success");  // Navigate to the order success page
        },
        prefill: {
          name: "Customer Name",  // Update with dynamic data
          email: "customer@example.com",  // Update with dynamic data
          contact: "9999999999",  // Optional: Get customer contact if available
        },
        notes: {
          address: useraddress?.address,  // Pass any additional info here
        },
        theme: {
          color: "#F37254",  // Customize the color of the payment modal
        },
      };
  
      // Check if Razorpay is available
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();  // Open the Razorpay payment modal
      } else {
        throw new Error("Razorpay script not loaded.");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Payment initiation failed!");
    }
  }, [totalprice, backendurl, navigate, useraddress]);
  
  useEffect(() => {
    getCartItems();
    getCurrentUserAddress();
  }, [getCartItems, getCurrentUserAddress]);

  const shipping = 20;
  const tax = 10;
  const finalPrice = totalprice + shipping + tax;

  return (
    <>
      {cartlength > 0 ? (
        <div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
          <div className="max-w-4xl max-md:max-w-xl mx-auto p-4">
            <h1 className="text-5xl mt-6 text-center font-extrabold text-three">
              Your Order
            </h1>
          </div>

          {/* Products */}
          <div>
            <div className="w-auto bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="text-xl pb-2 underline font-bold text-three">
                      SNo.
                    </th>
                    <th className="text-xl pb-2 underline font-bold text-three">
                      Title
                    </th>
                    <th className="text-xl pb-2 underline font-bold text-three">
                      Quantity
                    </th>
                    <th className="text-xl pb-2 underline font-bold text-three">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-slate-600 p-2 font-medium">{index + 1}</td>
                      <td className="text-slate-600 p-2 font-medium">{item.title}</td>
                      <td className="text-slate-600 p-2 font-medium">{item.quantity}</td>
                      <td className="text-black font-medium">
                        {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"} {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="border-gray-300" />
              <ul className="text-gray-800 mt-4 px-4 md:px-8 lg:px-10 xl:px-12 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Subtotal{" "}
                  <span className="ml-auto font-bold">
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"} {totalprice}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Shipping{" "}
                  <span className="ml-auto font-bold">
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"} {shipping}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Tax{" "}
                  <span className="ml-auto font-bold">
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"} {tax}
                  </span>
                </li>
                <hr className="border-gray-300" />
                <li className="flex flex-wrap gap-4 text-sm font-bold">
                  Total{" "}
                  <span className="ml-auto">
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"} {finalPrice}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Address */}
          <div>
            {Object.keys(useraddress).length === 0 ? (
              <div>
                Please add Your Address First
                <Link to={"/address"}>
                  <button className="btn btn-outline">Address</button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="w-auto bg-white mb-4 rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                  <ul className="text-gray-800 mx-12 space-y-4">
                    <li className="flex flex-wrap gap-4 text-sm">
                      Address <span className="ml-auto font-bold">{useraddress?.address}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      Country <span className="ml-auto font-bold">{useraddress?.country}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      State <span className="ml-auto font-bold">{useraddress?.state}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      City <span className="ml-auto font-bold">{useraddress?.city}</span>
                    </li>
                    <hr className="border-gray-300" />
                    <li className="flex flex-wrap gap-4 text-sm font-bold">
                      Pincode <span className="ml-auto">{useraddress?.zipCode}</span>
                    </li>
                  </ul>
                  <div className="mt-8 mx-12 space-y-2">
                    <button
                      className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-three hover:bg-opacity-80 text-white rounded-md"
                      onClick={createBill}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full w-full mb-20 flex flex-col justify-center items-center">
          <img src="./public/images/empty_cart.png" className="h-[30rem] w-[30rem]" />
          <div className=" text-4xl italic font-serif">Looks like there is nothing in the cart !!</div>
        </div>
      )}
    </>
  );
}

export default Bill;
