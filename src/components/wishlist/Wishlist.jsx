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

  useEffect(() => {
    getWishlistItems();
  }, [getWishlistItems, currency]);

  return (
    <>
      {wishlist.length > 0 ? (
        <div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
          <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-extrabold text-gray-800">
              Your Wishlist
            </h1>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="md:col-span-2 space-y-4">
                {wishlist.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
                  >
                    <div className="flex gap-4">
                      <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img
                          src={item.productId.images[0]}
                          alt={item.productId.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-base font-bold text-gray-800">
                            {item.productId.title}
                          </h3>
                          <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                            Color:{" "}
                            <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-auto flex flex-col">
                      <div className="flex items-start gap-4 justify-end">
                        <button
                          onClick={() => deleteWishlist(item.productId._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 cursor-pointer fill-gray-400 inline-block"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-gray-800 mt-auto">
                        {item.productId.price}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full mb-20 flex flex-col justify-center items-center">
          <img
            src="./images/empty_wishlist.png"
            alt="Empty wishlist"
            className="h-[30rem] w-[30rem]"
          />
          <div className="text-4xl italic font-serif">
            Nothing in your wishlist !!
          </div>
        </div>
      )}
    </>
  );
}

export default Wishlist;
