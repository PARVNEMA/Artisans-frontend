import { IndianRupee } from "lucide-react";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import axios from "axios";
import { toast } from "react-toastify";

function Cards({ product }) {
	const { currency } = useContext(CurrencyContext);

	const backendurl = import.meta.env.VITE_URL;
	const addWishlistItem = useCallback(async (productId) => {
		try {
			console.log("productId", productId);
			const res = await axios.post(
				`${backendurl}/wishlist`,
				{ productId: product._id },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("add to  wishlisted items=", res.data);
			toast("Added to wishlist", {
				type: "success",
				theme: "colored",
			});
		} catch (error) {
			console.log("Error", error);
			toast.error("Please login first");
		}
	}, []);
	return (
		<div>
			{/* <Link to={`/productdetails/${product._id}`}> */}
			<div class="bg-transaparent p-10 overflow-hidden  cursor-pointer hover:-translate-y-2 transition-all relative boder-box ">
				<div class="bg-black opacity-80 hover:opacity-100 p-5 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3 ">
					<button
						onClick={addWishlistItem}
						className="z-40"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25px"
							class="fill-white inline-block"
							viewBox="0 0 64 64"
						>
							<path
								d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
								data-original="#000000"
							></path>
						</svg>
					</button>
				</div>

				<Link to={`/productdetails/${product._id}`}>
					<div class="h-[260px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
						<img
							src={product.images[0]}
							alt="Product 1"
							class="h-full w-full object-top object-cover bg-transparent"
						/>
					</div>

					<div class="p-6 ">
						<h3 class="text-lg font-medium text-[#0C084C] group-hover:text-white transition-colors duration-300">
							{product.title}
						</h3>
						<Link to={`/artisans/${product.createdBy._id}`}>
							<div className="flex flex-row gap-4">
								<img
									src={product.createdBy.avatar}
									alt=""
									height={30}
									width={40}
									className="rounded-full"
								/>
								<h3 class="text-md text-[#096386]  font-medium mt-2 flex flex-row">
									{product.createdBy.fullName}
								</h3>
							</div>
						</Link>
						<h4 class="text-lg text-black font-medium mt-2 flex flex-row">
							{currency === "INR"
								? "₹"
								: currency === "USD"
								? "$"
								: "€ "}
							{product.price}
						</h4>

						{/* <p class="text-gray-600 text-sm mt-2">{product.description}</p> */}

						{/* <div className=""></div> */}

						<div class="flex space-x-2 mt-4">
							<svg
								className={`w-4  ${
									Math.floor(product.avgRating) >= 1
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
								className={`w-4  ${
									Math.floor(product.avgRating) >= 2
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
								className={`w-4  ${
									Math.floor(product.avgRating) >= 3
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
								className={`w-4  ${
									Math.floor(product.avgRating) >= 4
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
								className={`w-4  ${
									Math.floor(product.avgRating) >= 5
										? "fill-[#facc15]"
										: "fill-[#e5e7eb]"
								}`}
								viewBox="0 0 14 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
							</svg>
						</div>
					</div>
				</Link>
			</div>
			{/* </Link> */}
		</div>
	);
}

export default Cards;
