import axios from "axios";
import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
function ProductList() {
	const { currency } = useContext(CurrencyContext);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] =
		useState("");
	const [selectedState, setSelectedState] = useState("");
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [reviewRating, setReviewRating] = useState(0);
	const backendurl = import.meta.env.VITE_URL; // Fetch products based on filters and currency
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
			console.log("res in product list =", res.data);
			setProducts(res.data.data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	}; // Fetch all categories
	const getAllCategories = async () => {
		try {
			const res = await axios.get(
				`${backendurl}/category`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("categories =", res.data);
			setCategories(res.data.data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};
	// Fetch all states
	const states = [
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chhattisgarh",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",
	];
	// Fetch products whenever the filters or currency changes
	useEffect(() => {
		getAllProducts();
	}, [
		currency,
		// selectedCategory,
		// // selectedState,
		// // priceRange,
		// reviewRating,
	]); // Fetch categories and states only once when the component mounts
	useEffect(() => {
		getAllCategories();
	}, []);

	return (
    <div className="flex">
      {/* Sidebar for filters */}
      <div className="w-1/4 xl:w-1/6 p-4 sticky top-0 h-screen overflow-auto bg-four bg-opacity-50">
        <h3 className="text-2xl font-bold mb-4">Filter by</h3>
        {/* Category Filter */}
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            className="w-full p-2 border rounded-xl"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* State Filter */}
        <div className="mb-4">
          <label className="block mb-2">Origin State</label>
          <select
            className="w-full p-2 border rounded-xl"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="block mb-2">Price Range</label>
          <p>Min:</p>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full mb-2"
          />
          <p>Max:</p>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full mb-2"
          />
          <div className="flex justify-between">
            <span>
              {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"}
              {priceRange[0]}
            </span>
            <span>
              {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"}
              {priceRange[1]}
            </span>
          </div>
        </div>
        {/* Review Rating Filter */}
        <div className="mb-4">
          <label className="block mb-2">Review Rating</label>
          <select
            className="w-full p-2 border rounded-xl"
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
      {/* Product list */}
      <div className="max-w-[1204px] mt-6 gap-[46px] mx-auto flex w-full flex-col md:px-5">
        <div className="font-[comic sans] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-three text-center mb-6">
            PRODUCTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (product) =>
                  (selectedCategory === "" ||
                    product?.category._id === selectedCategory) &&
                  (selectedState === "" ||
                    product?.origin?.state === selectedState) &&
                  (reviewRating === 0 || product?.avgRating >= reviewRating) &&
                  (priceRange[0] === 0 || product?.price >= priceRange[0]) &&
                  (priceRange[1] === 10000 || product?.price <= priceRange[1])
              )
              .map((filteredProduct) => (
                <Cards product={filteredProduct} key={filteredProduct._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
