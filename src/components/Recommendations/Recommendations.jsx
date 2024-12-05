import axios from "axios";
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import Cards from "../productcard/Cards";

function Recommendations() {
	const [wishlist, setWishlist] = useState([]);
	const [products, setProducts] = useState([]);
	const [recproducts, setrecproducts] = useState([]);
	const { currency } = useContext(CurrencyContext);
	const backendurl = import.meta.env.VITE_URL;

	const getWishlistItems = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/wishlist?currency=${currency}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("current wishlisted items=", res.data);
			setWishlist(res.data.items);
		} catch (error) {
			console.log("Error", error);
		}
	}, [backendurl, currency]);

	const getAllFeaturedProducts = async () => {
		const res = await axios.get(
			`${backendurl}/products/recommendations?currency=${currency}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log(
			"res in recommended pawan list =",
			res.data
		);
		setProducts(res.data.data.recommendations);
	};
	const getAllRecommendedProducts = async () => {
		const res = await axios.get(
			`${backendurl}/products/recommended?currency=${currency}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log(
			"res in recommended products list",
			res.data
		);
		setrecproducts(res.data.data);
	};

	useEffect(() => {
		getWishlistItems();
	}, [getWishlistItems, currency]);
	useEffect(() => {
		getAllFeaturedProducts();

		getAllRecommendedProducts();
	}, [currency, wishlist]);

	// const recommendedProducts = products.filter((product) =>
	// 	wishlist.some(
	// 		(item) =>
	// 			product.category === item.productId.category &&
	// 			product._id !== item.productId._id
	// 	)
	// );

	return (
		<div className="container mx-auto p-4">
			{wishlist.length > 0 ? (
				<div className="wishlist-container">
					<h1 className="text-4xl text-center my-8 font-extrabold text-three">
						Recommendations
					</h1>
					<div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-2">
						{products?.map((product) => (
							<Cards product={product} key={product._id} />
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center mt-12">
					<p>No recommendations available.</p>
					<div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-2">
						{recproducts.map((product) => (
							<Cards product={product} key={product._id} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Recommendations;
