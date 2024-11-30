import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category() {
  const [category, setcategory] = useState([]);

  const backendurl = import.meta.env.VITE_URL;

  const getAllCategories = async () => {
    const res = await axios.get(`${backendurl}/category`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("categories =", res.data);
    setcategory(res.data.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h2 className="sm:text-4xl text-2xl text-center font-bold text-three mb-12">
        We Got It All Here !
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {category.map((cat) => (
          <Link to={`/category/${cat._id}`} key={cat._id} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <img
                src={cat.categoryImage}
                alt={cat.name}
                className="h-44 w-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-lg font-semibold text-white bg-black bg-opacity-50 px-3 py-1 rounded-md">
                  {cat.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
