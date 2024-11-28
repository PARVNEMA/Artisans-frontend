import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Wishlist() {
  const [wishlist, setwishlist] = useState([]);
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

      setwishlist(res.data.items);
      // settotalprice(res.data.data.totalCartPrice);
      // if (res.data.message === "Your cart is empty.") {
      // 	setcartlength(0);
      // } else {
      // 	setcartlength(1);
      // }
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const delteWishlist = useCallback(async (productId) => {
    try {
      const res = await axios.patch(
        `${backendurl}/wishlist/delete`,
        {
          productId: productId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("deleted wishlisted items=", res.data);
      toast.success("Product removed from wishlist");
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    getWishlistItems();
  }, [currency, delteWishlist]);
  return (
    <>
      {wishlist.length > 0 ? (
        <div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
          <div class="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
            <h1 class="text-2xl font-extrabold text-gray-800">Your Wishlist</h1>
            <div class="grid md:grid-cols-3 gap-4 mt-8">
              <div class="md:col-span-2 space-y-4">
                {wishlist?.map((item) => (
                  <div class="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                    <div class="flex gap-4">
                      <div class="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img
                          src={item.productId.images[0]}
                          class="w-full h-full object-contain"
                        />
                      </div>

                      <div class="flex flex-col gap-4">
                        <div>
                          <h3 class="text-base font-bold text-gray-800">
                            {item.productId.title}
                          </h3>
                          <p class="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                            Color:{" "}
                            <span class="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="ml-auto flex flex-col">
                      <div class="flex items-start gap-4 justify-end">
                        <button
                          onClick={() => delteWishlist(item.productId._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 cursor-pointer fill-gray-400 inline-block"
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
                      <h3 class="text-base font-bold text-gray-800 mt-auto">
                        {item.productId.price}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div class="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
								<ul class="text-gray-800 space-y-4">
									<li class="flex flex-wrap gap-4 text-sm">
										Subtotal{" "}
										<span class="ml-auto font-bold">
											$200.00
										</span>
									</li>
									<li class="flex flex-wrap gap-4 text-sm">
										Shipping{" "}
										<span class="ml-auto font-bold">
											$2.00
										</span>
									</li>
									<li class="flex flex-wrap gap-4 text-sm">
										Tax{" "}
										<span class="ml-auto font-bold">
											$4.00
										</span>
									</li>
									<hr class="border-gray-300" />
									<li class="flex flex-wrap gap-4 text-sm font-bold">
										Total{" "}
										<span class="ml-auto">
											{totalprice}
										</span>
									</li>
								</ul>

								<div class="mt-8 space-y-2">
									<button
										type="button"
										class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
									>
										Buy Now
									</button>
									<button
										type="button"
										class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
									>
										Continue Shopping{" "}
									</button>
								</div>

								<div class="mt-4 flex flex-wrap justify-center gap-4">
									<img
										src="https://readymadeui.com/images/master.webp"
										alt="card1"
										class="w-10 object-contain"
									/>
									<img
										src="https://readymadeui.com/images/visa.webp"
										alt="card2"
										class="w-10 object-contain"
									/>
									<img
										src="https://readymadeui.com/images/american-express.webp"
										alt="card3"
										class="w-10 object-contain"
									/>
								</div>
							</div> */}

              {/* address */}
              {/* {Object.keys(useraddress).length === 0 ? (
								<>
									<div>
										please add Your Address First
										<Link to={"/address"}>
											<button className="btn btn-outline">
												Address
											</button>
										</Link>
									</div>
								</>
							) : (
								<div class="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
									<ul class="text-gray-800 space-y-4">
										<li class="flex flex-wrap gap-4 text-sm">
											Address
											<span class="ml-auto font-bold">
												{useraddress?.address}
											</span>
										</li>
										<li class="flex flex-wrap gap-4 text-sm">
											country
											<span class="ml-auto font-bold">
												{useraddress?.country}
											</span>
										</li>
										<li class="flex flex-wrap gap-4 text-sm">
											state
											<span class="ml-auto font-bold">
												{useraddress?.state}
											</span>
										</li>
										<li class="flex flex-wrap gap-4 text-sm">
											city
											<span class="ml-auto font-bold">
												{useraddress?.city}
											</span>
										</li>
										<hr class="border-gray-300" />
										<li class="flex flex-wrap gap-4 text-sm font-bold">
											Pincode
											<span class="ml-auto">
												{useraddress?.zipCode}
											</span>
										</li>
									</ul>

									<div class="mt-8 space-y-2">
										<button
											type="button"
											class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
										>
											Buy Now
										</button>
										<button
											type="button"
											class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
										>
											Continue Shopping{" "}
										</button>
									</div>

									<div class="mt-4 flex flex-wrap justify-center gap-4">
										<img
											src="https://readymadeui.com/images/master.webp"
											alt="card1"
											class="w-10 object-contain"
										/>
										<img
											src="https://readymadeui.com/images/visa.webp"
											alt="card2"
											class="w-10 object-contain"
										/>
										<img
											src="https://readymadeui.com/images/american-express.webp"
											alt="card3"
											class="w-10 object-contain"
										/>
									</div>
								</div>
							)} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full mb-20 flex flex-col justify-center items-center">
          <img
            src="./images/empty_wishlist.png"
            className="h-[30rem] w-[30rem]"
          />
          <div className=" text-4xl italic font-serif">
            Nothing in your wishlist !!
          </div>
        </div>
      )}
    </>
  );
}

export default Wishlist;
