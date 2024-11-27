import axios from "axios";
import { IndianRupee } from "lucide-react";
import React, {
	useEffect,
	useState,
	useRef,
	useContext,
} from "react";
import { Link } from "react-router-dom";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Bounce, toast } from "react-toastify";

function FeaturedProducts() {
	const { currency } = useContext(CurrencyContext);
	const [products, setproducts] = useState([]);
	const backendurl = import.meta.env.VITE_URL;

	const getAllFeaturedproducts = async () => {
		const res = await axios.get(
			`${backendurl}/products/featured?currency=${currency}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in product list", res.data);
		setproducts(res.data.data);
		toast("data aaya chacha", res.data.data);
	};
	useEffect(() => {
		getAllFeaturedproducts();
	}, [currency]);
	return (
		<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
			<div class="font-[comic sans] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
				<h2 class="text-4xl font-extrabold mb-12 text-center">
					Featured Products
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 scroll-smooth focus:scroll-auto">
					{products.map((product) => (
						<Cards product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default FeaturedProducts;
