import axios from "axios";
import { IndianRupee } from "lucide-react";
import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";

function CategoryProducts() {
	const { currency } = useContext(CurrencyContext);
	let { categoryid } = useParams();
	const [products, setproducts] = useState([]);
	const backendurl = import.meta.env.VITE_URL;

	const getAllCategoryproducts = async () => {
		const res = await axios.get(
			`${backendurl}/category/${categoryid}?currency=${currency}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in category product  list", res.data);
		setproducts(res.data.data.convertedProducts);
	};
	useEffect(() => {
		getAllCategoryproducts();
	}, []);
	return (
		<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
			<div class="font-[comic sans] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
				<h2 class="text-4xl font-extrabold text-gray-800 mb-12 text-center">
					Category Products
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<Cards product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default CategoryProducts;
