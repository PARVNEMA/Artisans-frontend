import { IndianRupee } from "lucide-react";
import React, { useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import axios from "axios";
import { toast } from "react-toastify";

function Cards({ product }) {
	const { currency } = useContext(CurrencyContext);

	const backendurl = import.meta.env.VITE_URL;
	const navigate = useNavigate();
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
			});
		} catch (error) {
			console.log("Error", error);
			if (error.response.status === 401) {
				toast.error("Please login first");
			} else if (error.response.status === 400) {
				toast.error("Already added");
			}
		}
	}, []);
	const renderStars = () => {
		return [...Array(5)].map((_, i) => (
			<svg
				key={i}
				className={`w-4 ${
					Math.floor(product.avgRating) > i
						? "fill-[#facc15]"
						: "fill-[#e5e7eb]"
				}`}
				viewBox="0 0 14 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{" "}
				<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />{" "}
			</svg>
		));
	};
	const addToCart = async (productId) => {
		try {
			const res = await axios.post(
				`${backendurl}/cart/create-cart`,
				{
					productId: product._id,
					quantity: 1,
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
			console.log("Add to cart=", res.data);
			toast.success("Added to cart");
			navigate("/cart");
		} catch (error) {
				toast.error("Please login first");
			
		}
	};
	return (
		<div className="bg-white shadow-md p-4 overflow-hidden cursor-pointer hover:-translate-y-2 transition-all relative border border-gray-200 rounded-lg">
			{" "}
			<div className="absolute top-3 right-3 flex space-x-2">
				{" "}
				<button
					onClick={addWishlistItem}
					className="bg-three hover:bg-opacity-75 p-2 rounded-full z-10"
				>
					{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20px"
						className="fill-white"
						viewBox="0 0 64 64"
					>
						{" "}
						<path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />{" "}
					</svg>{" "}
				</button>{" "}
			</div>{" "}
			<Link
				to={`/productdetails/${product?._id}`}
				className="block"
			>
				{" "}
				<div className="h-[260px] overflow-hidden mx-auto aspect-w-16 aspect-h-9 hover:scale-[1.03] transition-transform duration-300">
					{" "}
					<img
						src={product.images[0]}
						alt={`Product - ${product?.title}`}
						className="h-full w-full object-top object-cover bg-transparent rounded-t-lg"
					/>{" "}
				</div>{" "}
				<div className="p-2">
					{" "}
					<h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 truncate">
						{" "}
						{product?.title}{" "}
					</h3>{" "}
					<Link
						to={`/artisans/${product?.createdBy?._id}`}
						className="flex flex-row gap-4 items-center mt-2 "
					>
						{" "}
						<img
							src={product?.createdBy?.avatar}
							alt={`${product?.createdBy?.fullName}'s avatar`}
							height={30}
							width={40}
							className="rounded-full object-contain"
						/>{" "}
						<h3 className="text-md text-gray-500 font-semibold">
							{" "}
							{product?.createdBy?.fullName}{" "}
						</h3>{" "}
					</Link>{" "}
					<h4 className="text-lg text-gray-800 font-semibold mt-2">
						{" "}
						{currency === "INR"
							? "₹"
							: currency === "USD"
							? "$"
							: "€ "}{" "}
						{product.price}{" "}
					</h4>{" "}
					<div className="flex space-x-2 mt-4 items-center">
						{" "}
						{renderStars()}{" "}
					</div>{" "}
					{product.discount && (
						<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold p-1 rounded">
							{" "}
							{product.discount}% OFF{" "}
						</div>
					)}{" "}
					{product.isNew && (
						<div className="absolute top-3 left-16 bg-blue-500 text-white text-xs font-bold p-1 rounded">
							{" "}
							NEW{" "}
						</div>
					)}{" "}
				</div>{" "}
				<button
					onClick={() => addToCart(product._id)}
					className="bg-three bg-opacity-[85%] hover:bg-opacity-[95%] p-2 rounded-full w-full h- flex justify-center items-center text-white"
				>
					{" "}
					<h1 className="font-semibold">Add To Cart</h1>
				</button>
			</Link>{" "}
		</div>
	);
}

export default Cards;
