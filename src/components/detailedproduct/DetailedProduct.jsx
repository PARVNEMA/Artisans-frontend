import axios from "axios";
import { IndianRupee, Star } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailedProduct() {
	let { id } = useParams();
	const [product, setproduct] = useState({});
	const [reviews, setreviews] = useState([]);
	const backendurl = import.meta.env.VITE_URL;
	const [rating, setrating] = useState(0);
	const [userReview, setuserReview] = useState("");

	const getproductsdetails = async () => {
		const res = await axios.get(
			`${backendurl}/products/detail/${id}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in detailed product  list", res.data);
		setproduct(res.data.data);
	};
	const getAllReviews = async () => {
		const res = await axios.get(
			`${backendurl}/reviews/${id}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in reviews list", res.data);
		setreviews(res.data.data);
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
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in post review", res.data);
	};
	// console.log("ratings", rating);

	useEffect(() => {
		getproductsdetails();
		getAllReviews();
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
												{product.images.map(
													(image, index) => (
														<img
															key={index}
															src={image}
															alt={`Product ${index + 1}`}
															className="w-full cursor-pointer rounded-lg"
														/>
													)
												)}{" "}
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
										<h3 class="text-xl font-bold text-gray-800">
											Description
										</h3>
										<div class="flex flex-wrap gap-4 mt-4">
											<p>{product?.description}</p>
										</div>
									</div>

									<div class="mt-10 flex flex-wrap gap-4">
										<button
											type="button"
											class="flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white border border-gray-800 text-base rounded-lg"
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
										<h3 class="text-xl font-bold text-gray-800">
											Reviews(10)
										</h3>
										<div class="grid md:grid-cols-2 gap-12 mt-4">
											<div class="space-y-3">
												<div class="flex items-center">
													<p class="text-sm text-gray-800 font-bold">
														5.0
													</p>
													<svg
														class="w-5 fill-blue-600 ml-1"
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
													<div class="bg-gray-400 rounded w-full h-2 ml-3">
														<div class="w-2/3 h-full rounded bg-blue-600"></div>
													</div>
													<p class="text-sm text-gray-800 font-bold ml-3">
														66%
													</p>
												</div>

												<div class="flex items-center">
													<p class="text-sm text-gray-800 font-bold">
														4.0
													</p>
													<svg
														class="w-5 fill-blue-600 ml-1"
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
													<div class="bg-gray-400 rounded w-full h-2 ml-3">
														<div class="w-1/3 h-full rounded bg-blue-600"></div>
													</div>
													<p class="text-sm text-gray-800 font-bold ml-3">
														33%
													</p>
												</div>

												<div class="flex items-center">
													<p class="text-sm text-gray-800 font-bold">
														3.0
													</p>
													<svg
														class="w-5 fill-blue-600 ml-1"
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
													<div class="bg-gray-400 rounded w-full h-2 ml-3">
														<div class="w-1/6 h-full rounded bg-blue-600"></div>
													</div>
													<p class="text-sm text-gray-800 font-bold ml-3">
														16%
													</p>
												</div>

												<div class="flex items-center">
													<p class="text-sm text-gray-800 font-bold">
														2.0
													</p>
													<svg
														class="w-5 fill-blue-600 ml-1"
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
													<div class="bg-gray-400 rounded w-full h-2 ml-3">
														<div class="w-1/12 h-full rounded bg-blue-600"></div>
													</div>
													<p class="text-sm text-gray-800 font-bold ml-3">
														8%
													</p>
												</div>

												<div class="flex items-center">
													<p class="text-sm text-gray-800 font-bold">
														1.0
													</p>
													<svg
														class="w-5 fill-blue-600 ml-1"
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
													<div class="bg-gray-400 rounded w-full h-2 ml-3">
														<div class="w-[6%] h-full rounded bg-blue-600"></div>
													</div>
													<p class="text-sm text-gray-800 font-bold ml-3">
														6%
													</p>
												</div>
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
															Lorem ipsum dolor sit amet,
															consectetur adipisci elit, sed
															eiusmod tempor incidunt ut
															labore et dolore magna aliqua.
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
												onChange={(e) =>
													setuserReview(e.target.value)
												}
												placeholder="Write your review here..."
											/>
											<div>
												<button
													onClick={() => setrating(1)}
												>
													<svg
														className={`w-8 h-8  ${
															rating >= 1
																? "fill-[#facc15]"
																: "fill-[#e5e7eb]"
														} `}
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
												</button>
												<button
													onClick={() => setrating(2)}
												>
													<svg
														className={`w-8 h-8 ${
															rating >= 2
																? "fill-[#facc15]"
																: "fill-[#e5e7eb]"
														}`}
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
												</button>
												<button
													onClick={() => setrating(3)}
												>
													<svg
														className={`w-8 h-8  ${
															rating >= 3
																? "fill-[#facc15]"
																: "fill-[#e5e7eb]"
														}`}
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
												</button>
												<button
													onClick={() => setrating(4)}
												>
													<svg
														className={`w-8 h-8  ${
															rating >= 4
																? "fill-[#facc15]"
																: "fill-[#e5e7eb]"
														}`}
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
												</button>
												<button
													onClick={() => setrating(5)}
												>
													<svg
														className={`w-8 h-8  ${
															rating >= 5
																? "fill-[#facc15]"
																: "fill-[#e5e7eb]"
														}`}
														viewBox="0 0 14 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
													</svg>
												</button>
											</div>
											<button onClick={postReview}>
												Submit
											</button>
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
													src="https://readymadeui.com/team-2.webp"
													class="w-12 h-12 rounded-full border-2 border-white"
												/>
												<div class="ml-3">
													<h4 class="text-sm font-bold text-gray-800">
														{
															review.reviewerDetails
																.fullName
														}
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
