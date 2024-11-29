import axios from "axios";
import { IndianRupee } from "lucide-react";
import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { Link } from "react-router-dom";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";

function ProductList() {
	const { currency } = useContext(CurrencyContext);
	const [products, setproducts] = useState([]);

	const backendurl = import.meta.env.VITE_URL;

	const getAllproducts = async () => {
		const res = await axios.get(
			`${backendurl}/products?currency=${currency}`,
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
	};
	useEffect(() => {
		getAllproducts();
	}, [currency]);
	return (
		<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
			<div class="font-[comic sans] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
				<h2 class="text-4xl font-extrabold text-[#096386] text-center mb-12">
					PRODUCTS
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

export default ProductList;
