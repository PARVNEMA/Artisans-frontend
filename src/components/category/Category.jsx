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
    <div className="mt-4 ">
      <h2 class="text-4xl text-center font-extrabold mb-12">Categories</h2>

			<div className=" relative z-10 grid grid-cols-5 gap-5 mx-90 mb-10 mt-4 mx-auto aspect-w-16 aspect-h-8"> 
			
        {category.map((cat) => (
          <Link to={`/category/${cat._id}`}>
						<div className=" relative flex justify-center items-center text-center h-56 w-58 border border-black shadow-md overflow-hidden mx-auto aspect-w-16 aspect-h-8 ">
              <div
                className={`border item-center border-black  blur-[1px] h-full w-full`}
              >
                <img
                  src={cat.categoryImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="absolute items-center font-semibold text-black bg-white bg-opacity-75 p-1 px-3 rounded-lg text-lg blur-0">
                {cat.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
			
    </div>
		
  );
}

export default Category;
