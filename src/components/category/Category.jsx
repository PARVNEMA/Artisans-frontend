import axios from "axios";
import React, { useEffect, useState } from "react";

function Category() {
	const [category, setcategory] = useState([]);

	const backendurl = import.meta.env.VITE_URL;

	const getAllCategories = async () => {
		const res = await axios.get(`${backendurl}/category`, {
			withCredentials: true, // Ensure cookies are included in the request
			headers: {
				Authorization: `Bearer ${localStorage.getItem(
					"accessToken"
				)}`,
			},
		});
		console.log("categories =", res.data);
		setcategory(res.data.data);
	};
	useEffect(() => {
		getAllCategories();
	}, []);
	return (
		<div className="mt-4">
			<h2 class="text-4xl text-center font-extrabold text-gray-800 mb-12">
				Categories
			</h2>
			<div className="grid grid-cols-5 gap-5 mx-32 mb-10">
				{category.map((cat) => (
					<div className=" relative flex justify-center items-center text-center h-40 w-34 border border-black shadow-md rounded-2xl overflow-hidden  ">
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
				))}
			</div>
		</div>
	);
}

export default Category;
