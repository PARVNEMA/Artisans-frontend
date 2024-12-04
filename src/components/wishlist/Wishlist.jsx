import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { currency } = useContext(CurrencyContext);
  const backendurl = import.meta.env.VITE_URL;

  const getWishlistItems = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/wishlist?currency=${currency}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("current wishlisted items=", res.data);

      setWishlist(res.data.items);
    } catch (error) {
      console.log("Error", error);
    }
  }, [backendurl, currency]);

  const deleteWishlist = useCallback(
    async (productId) => {
      try {
        const res = await axios.patch(
          `${backendurl}/wishlist/delete`,
          { productId },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("deleted wishlisted items=", res.data);
        toast.success("Product removed from wishlist");
        getWishlistItems();
      } catch (error) {
        console.log("Error", error);
      }
    },
    [backendurl, getWishlistItems]
  );

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${backendurl}/cart/create-cart`,
        {
          productId: productId,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Add to cart=", res.data);
      toast.success("Added to cart");
    } catch (error) {
      if (error.response.status === 400) toast.error("Out of stock");
      else toast.error("Please login first");
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, [getWishlistItems, currency]);

  return (
    <div className="container mx-auto p-4">
      {wishlist.length > 0 ? (
        <div className="wishlist-container">
          <h1 className="text-4xl text-center my-8 font-extrabold text-three">
            Your Wishlist
          </h1>
          <div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-2">
            {wishlist.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center"
              >
                <div className="w-36 h-36 max-sm:w-24 max-sm:h-24 flex-shrink-0">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow mt-4 lg:mt-0 lg:ml-6">
                  <h3 className="text-xl font-bold text-three">
                    {item.productId.title}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-three">
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€ "}
                    {item.productId.price}
                  </p>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-auto flex flex-col lg:flex-row items-center gap-4">
                  <button
                    className="text-xl p-4 bg-three text-white bg-opacity-90 hover:bg-opacity-70 rounded-lg"
                    onClick={() => addToCart(item.productId._id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => deleteWishlist(item.productId._id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-12">
          <img
            src="./images/empty_wishlist.png"
            alt="Empty wishlist"
            className="h-[30rem] w-[30rem] mb-6"
          />
          <div className="text-4xl italic font-serif text-gray-500">
            Nothing in your wishlist !!
          </div>
          <Link
            to="/products"
            className="mt-4 text-blue-600 hover:underline font-bold text-3xl"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
