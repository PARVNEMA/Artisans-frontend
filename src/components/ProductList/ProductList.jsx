import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../productcard/Cards";
import { CurrencyContext } from "../../../useContext/CurrencyContext";

function ProductList() {
  const { currency } = useContext(CurrencyContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const backendurl = import.meta.env.VITE_URL;

  // Fetch products based on selected category and currency
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/products?currency=${currency}&category=${selectedCategory}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("res in product list", res.data);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${backendurl}/category`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("categories =", res.data);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch products whenever the selected category or currency changes
  useEffect(() => {
    getAllProducts();
  }, [currency, selectedCategory]);

  // Fetch categories only once when the component mounts
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar for category filter */}
      <div className="w-1/4 p-4">
        <h3 className="text-2xl font-bold mb-4">Filter by Category</h3>
        <select
          className="w-full p-2 border rounded"
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
                  selectedCategory === "" ||
                  product.category._id === selectedCategory
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
