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
	const [catproducts, setCatProducts] = useState([]);
	const backendurl = import.meta.env.VITE_URL;

	const getAllProducts = async () => {
		try {
			const res = await axios.get(
				`${backendurl}/products?currency=${currency}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log(
				"res in category product list =",
				res.data
			);
			setCatProducts(res.data.data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, [currency]);

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
		try {
			const res = await axios.get(
				`${backendurl}/products/recommendations?currency=${currency}`,
				{
					withCredentials: true,
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
		} catch (error) {
			console.log("Error", error);
		}
	};

	const getAllRecommendedProducts = async () => {
		try {
			const res = await axios.get(
				`${backendurl}/products/recommended?currency=${currency}`,
				{
					withCredentials: true,
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
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		getWishlistItems();
	}, [getWishlistItems, currency]);

	useEffect(() => {
		getAllFeaturedProducts();
		getAllRecommendedProducts();
	}, [currency, wishlist]);

	const recommendedProducts = catproducts.filter(
		(catproduct) =>
			wishlist.some(
				(item) =>
					catproduct.category._id ===
						item.productId.category &&
					catproduct._id !== item.productId._id
			)
	);

	return (
		<div className="container  p-4">
			<h1 className="text-4xl text-center my-8 font-extrabold text-three">
				Recommendations
			</h1>
			{products.length > 5 ? (
				<div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-4">
					{products?.map((product) => (
						<Cards product={product} key={product._id} />
					))}
				</div>
			) : (
				<div>
					{wishlist.length > 0 ? (
						<div className="wishlist-container">
							<div className="flex flex-col items-center mt-12">
								<div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-4">
									{recommendedProducts.map((product) => (
										<Cards
											product={product}
											key={product._id}
										/>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center mt-12">
							<div className="grid grid-cols-1 gap-6 mx-[10rem] lg:grid-cols-4">
								{recproducts.map((product) => (
									<Cards
										product={product}
										key={product._id}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Recommendations;
