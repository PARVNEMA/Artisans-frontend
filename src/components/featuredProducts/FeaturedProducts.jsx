import axios from "axios";
import { IndianRupee } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Cards from "../productcard/Cards";

function FeaturedProducts() {
  const [products, setproducts] = useState([]);
  const backendurl = import.meta.env.VITE_URL;

  const getAllFeaturedproducts = async () => {
    const res = await axios.get(`${backendurl}/products/featured`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("res in product list", res.data);
    setproducts(res.data.data);
  };
  useEffect(() => {
    getAllFeaturedproducts();
  }, []);
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
