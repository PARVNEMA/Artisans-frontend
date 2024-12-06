import axios from "axios";
import { IndianRupee } from "lucide-react";
import React, {
	useEffect,
	useState,
	useContext,
} from "react";
import { Link } from "react-router-dom";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";

function Seasonal() {
	const { currency } = useContext(CurrencyContext);
	const [products, setProducts] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const backendurl = import.meta.env.VITE_URL;

	const getAllSeasonalProducts = async () => {
		const res = await axios.get(
			`${backendurl}/seasons/products`,
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
			"res in product list Seasonal routes =",
			res.data.data
		);
		setProducts(res.data.data);
	};

	useEffect(() => {
		getAllSeasonalProducts();
	}, [currency]);

	// const productsToShow = showAll
	// 	? products
	// 	: products.slice(0, 8); // Show 8 products (2 rows with 4 columns each)

	return (
		<div className="max-w-full gap-[46px] mx-auto flex w-full flex-col md:px-5 ">
			<div className="py-4 mx-auto lg:max-w-7xl sm:max-w-full">
				<div className="flex justify-between text-center">
					<div className="w-[85%] pl-[8rem]">
						<h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-8">
							Shop Now
						</h1>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 scroll-smooth focus:scroll-smooth ">
					{/* {products?.map((product) => (
						<Cards product={product} key={product?._id} />
					))} */}
					{/* {products?.map((product) => (
						<>{product?.title}</>
					))} */}
				</div>
				{/* <div className=" flex justify-center mt-8">
					{!showAll && products?.length > 8 && (
						<button
							className="bg-three hover:bg-opacity-75 bg-opacity-95 text-white p-4 rounded-full flex justify-center"
							onClick={() => setShowAll(true)}
						>
							View All
						</button>
					)}
				</div> */}
			</div>
		</div>
	);
}

export default Seasonal;
