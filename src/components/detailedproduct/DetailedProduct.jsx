import axios from "axios";
import { IndianRupee, Star } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { over } from "lodash";

function DetailedProduct() {
  let { id } = useParams();
  const [product, setproduct] = useState({});
  const [reviews, setreviews] = useState([]);
  const backendurl = import.meta.env.VITE_URL;
  const [rating, setrating] = useState(0);
  const [userReview, setuserReview] = useState("");
  const [overallrating, setoverallrating] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getproductsdetails = async () => {
    const res = await axios.get(`${backendurl}/products/detail/${id}`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("res in detailed product  list", res.data);
    setproduct(res.data.data);
  };
  const getAllReviews = async () => {
    const res = await axios.get(`${backendurl}/reviews/${id}`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("res in reviews list", res.data);
    setreviews(res.data.data);
  };
  const getOverallRating = async () => {
    const res = await axios.get(`${backendurl}/reviews/${id}/ratings-stats`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("overall reviews data", res.data);
    setoverallrating(res.data.data.ratingsData);
  };

  const postReview = async () => {
    const res = await axios.post(
      `${backendurl}/reviews/${id}`,
      {
        rating: rating,
        reviewText: userReview,
      },
      {
        withCredentials: true, // Ensure cookies are included in the request
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("res in post review", res.data);
  };
  const addToCart = async () => {
    const res = await axios.post(
      `${backendurl}/cart/create-cart`,
      {
        productId: product._id,
        quantity: quantity,
      },
      {
        withCredentials: true, // Ensure cookies are included in the request
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("Add to cart=", res.data);
  };
  // console.log("ratings", rating);

  useEffect(() => {
    getproductsdetails();
    getAllReviews();
    getOverallRating();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="max-w-[85.25rem] md:px-[1.25rem] gap-[2.88rem] mx-auto flex w-full flex-col border border-red-500">
          <div class="font-sans">
            <div class="p-4 max-w-8xl max-md:max-w-xl mx-auto">
              <div class="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full  top-0 flex gap-3">
                  {product?.images?.length > 0 && (
                    <>
                      {" "}
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="w-3/4 rounded-lg object-cover "
                      />{" "}
                      <div className="w-20 flex flex-col max-sm:mb-4 gap-3">
                        {" "}
                        {product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full cursor-pointer rounded-lg"
                          />
                        ))}{" "}
                      </div>{" "}
                    </>
                  )}
                </div>

                <div>
                  <h2 class="text-2xl max-sm:text-2xl font-bold text-gray-800">
                    {product?.title}
                  </h2>
                  <div class="mt-8">
                    <h3 class="text-gray-800 text-4xl max-sm:text-3xl font-bold flex">
                      <IndianRupee /> {product?.price}
                    </h3>
                  </div>

                  <div class="mt-8">
                    <h3 class="text-xl font-bold text-gray-800">Description</h3>
                    <div class="flex flex-wrap gap-4 mt-4">
                      <p>{product?.description}</p>
                    </div>
                  </div>

                  <div>
                    <h1>{product?.createdBy?.username}</h1>
                    <img src={product?.createdBy?.avatar} alt="" />
                  </div>
                  <div class="mt-10 flex flex-wrap gap-4 ">
                    <button
                      type="button"
                      class="bg-two flex items-center justify-center px-8 py-4 hover:bg-gray-900 text-white border border-gray-800 text-base rounded-lg"
                      onClick={addToCart}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 cursor-pointer fill-current inline mr-3"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                      Add to cart
                    </button>

                    {/* counter */}
                    <div className="bg-two">
                      <form className="max-w-xs mx-auto">
                        {" "}
                        <label
                          htmlFor="bedrooms-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Choose quantity:{" "}
                        </label>{" "}
                        <div className="relative flex items-center max-w-[11rem]">
                          {" "}
                          <button
                            type="button"
                            id="decrement-button"
                            onClick={handleDecrement}
                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            {" "}
                            <svg
                              className="w-3 h-3 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              {" "}
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />{" "}
                            </svg>{" "}
                          </button>{" "}
                          <input
                            type="text"
                            id="bedrooms-input"
                            value={quantity}
                            readOnly
                            className="bg-two border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />{" "}
                          <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                            {" "}
                            <svg
                              className="w-2.5 h-2.5 text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              {" "}
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                              />{" "}
                            </svg>{" "}
                            <span>Bedrooms</span>{" "}
                          </div>{" "}
                          <button
                            type="button"
                            id="increment-button"
                            onClick={handleIncrement}
                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            {" "}
                            <svg
                              className="w-3 h-3 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              {" "}
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />{" "}
                            </svg>{" "}
                          </button>{" "}
                        </div>{" "}
                        <p
                          id="helper-text-explanation"
                          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          {" "}
                          Please select the number of bedrooms.{" "}
                        </p>{" "}
                      </form>
                    </div>

                    {/* coupon input field */}

                    <button
                      type="button"
                      class="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-800 text-base rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 cursor-pointer fill-current inline mr-3"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* reviews section */}
            <div>
              <div class="font-sans bg-white">
                <div class="p-4 lg:max-w-full max-w-4xl mx-auto">
                  <div class="mt-10 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                    <div class="grid md:grid-cols-2 gap-12 mt-4">
                      <div class="space-y-3">
                        {overallrating &&
                          overallrating.map((item) => (
                            <div class="flex items-center">
                              <p class="text-sm text-gray-800 font-bold">
                                {item.rating}
                              </p>
                              <div className="border ml-10 h-2  w-[100rem]">
                                <div
                                  className="bg-blue-600 h-2"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <p class="text-sm text-gray-800 font-bold ml-3">
                                {item.percentage} %
                              </p>
                            </div>
                          ))}
                      </div>

                      <div>
                        <div class="flex items-start">
                          <img
                            src="https://readymadeui.com/team-2.webp"
                            class="w-12 h-12 rounded-full border-2 border-white"
                          />
                          <div class="ml-3">
                            <h4 class="text-sm font-bold text-gray-800">
                              John Doe
                            </h4>
                            <div class="flex space-x-1 mt-1">
                              <svg
                                class="w-4 fill-blue-600"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg
                                class="w-4 fill-blue-600"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg
                                class="w-4 fill-blue-600"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg
                                class="w-4 fill-[#CED5D8]"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg
                                class="w-4 fill-[#CED5D8]"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <p class="text-xs !ml-2 font-semibold text-gray-800">
                                2 mins ago
                              </p>
                            </div>
                            <p class="text-sm mt-4 text-gray-800">
                              Lorem ipsum dolor sit amet, consectetur adipisci
                              elit, sed eiusmod tempor incidunt ut labore et
                              dolore magna aliqua.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          class="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
                        >
                          Read all reviews
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* add review
                   */}
                  {localStorage.getItem("accessToken") ? (
                    <div>
                      <h2>Add Review</h2>
                      <textarea
                        value={userReview}
                        onChange={(e) => setuserReview(e.target.value)}
                        placeholder="Write your review here..."
                      />
                      <div>
                        <button onClick={() => setrating(1)}>
                          <svg
                            className={`w-8 h-8  ${
                              rating >= 1 ? "fill-[#facc15]" : "fill-[#e5e7eb]"
                            } `}
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => setrating(2)}>
                          <svg
                            className={`w-8 h-8 ${
                              rating >= 2 ? "fill-[#facc15]" : "fill-[#e5e7eb]"
                            }`}
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => setrating(3)}>
                          <svg
                            className={`w-8 h-8  ${
                              rating >= 3 ? "fill-[#facc15]" : "fill-[#e5e7eb]"
                            }`}
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => setrating(4)}>
                          <svg
                            className={`w-8 h-8  ${
                              rating >= 4 ? "fill-[#facc15]" : "fill-[#e5e7eb]"
                            }`}
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => setrating(5)}>
                          <svg
                            className={`w-8 h-8  ${
                              rating >= 5 ? "fill-[#facc15]" : "fill-[#e5e7eb]"
                            }`}
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        </button>
                      </div>
                      <button onClick={postReview}>Submit</button>
                    </div>
                  ) : (
                    <Link to={"/login"}>
                      <div className="text-xl font-semibold font-sans ml-8 mt-4">
                        <h2>Login to add Review</h2>
                      </div>
                    </Link>
                  )}
                </div>

                {/* all reviews  */}
                <div>
                  {reviews &&
                    reviews.map((review) => (
                      <div class="flex items-start">
                        <img
                          src={review.reviewerDetails.avatar}
                          class="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div class="ml-3">
                          <h4 class="text-sm font-bold text-gray-800">
                            {review.reviewerDetails.fullName}
                          </h4>
                          <div class="flex space-x-1 mt-1">
                            <svg
                              className={`w-4  ${
                                review.rating >= 1
                                  ? "fill-[#facc15]"
                                  : "fill-[#e5e7eb]"
                              }`}
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg
                              className={`w-4 h-4 ${
                                review.rating >= 2
                                  ? "fill-[#facc15]"
                                  : "fill-[#e5e7eb]"
                              }`}
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg
                              className={`w-4 h-4 ${
                                review.rating >= 3
                                  ? "fill-[#facc15]"
                                  : "fill-[#e5e7eb]"
                              }`}
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg
                              className={`w-4 h-4 ${
                                review.rating >= 4
                                  ? "fill-[#facc15]"
                                  : "fill-[#e5e7eb]"
                              }`}
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg
                              className={`w-4 h-4 ${
                                review.rating >= 5
                                  ? "fill-[#facc15]"
                                  : "fill-[#e5e7eb]"
                              }`}
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <p class="text-xs !ml-2 font-semibold text-gray-800">
                              {review.createdAt}
                            </p>
                          </div>
                          <p class="text-md mt-4 text-gray-800">
                            {review.reviewText}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedProduct;
