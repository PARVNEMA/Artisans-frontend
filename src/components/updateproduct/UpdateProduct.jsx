import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
	const { productId } = useParams();
	const [product, setproduct] = useState({});
	const [category, setcategory] = useState([]);
	const navigate = useNavigate();

	const backendurl = import.meta.env.VITE_URL;
	// React Hook Form setup
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const getproductsdetails = async () => {
		const res = await axios.get(
			`${backendurl}/products/detail/${productId}`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("res in detailed product  list", res.data);
		setproduct(res.data.data);
	};
	const onSubmit = async (data) => {
		try {
			const res = await axios.patch(
				`${backendurl}/products/update/${productId}`,
				data,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);

			console.log(
				"res from uploading updated product from artisanss",
				res.data
			);
			navigate("/artisans/dashboard");
		} catch (error) {
			console.error("error in register form", error);
		}
	};

	// const getAllCategories = async () => {
	// 	const res = await axios.get(`${backendurl}/category`, {
	// 		withCredentials: true, // Ensure cookies are included in the request
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem(
	// 				"accessToken"
	// 			)}`,
	// 		},
	// 	});
	// 	console.log("categories =", res.data);
	// 	setcategory(res.data.data);
	// };
	useEffect(() => {
		// getAllCategories();
		getproductsdetails();
	}, []);
	return (
		<div>
			<div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]  bg-one max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto font-[sans-serif] py-6 px-[7rem]">
				<div className="text-center mb-16">
					<a href="javascript:void(0)">
						<img
							src="../images/logo2.png"
							alt="logo"
							className="w-52 inline-block"
						/>
					</a>
					<h1 className="text-three text-3xl font-bold mt-6">
						List your product on our website
					</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid sm:grid-cols-2 gap-8">
						<div>
							<label className="text-three text-2xl mb-2 block">
								Title
							</label>
							<input
								name="title"
								type="text"
								className="bg-four  text-black placeholder:text-black w-full text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
								placeholder="Enter the product title"
								{...register("title")}
								defaultValue={product?.title}
							/>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Price
							</label>
							<input
								name="price"
								type="number"
								className="bg-four text-black placeholder:text-black w-full text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
								placeholder="Enter price"
								{...register("price")}
								defaultValue={product?.price}
							/>
						</div>
						{/* <div>
							<label className="text-one text-2xl mb-2 block">
								Stock Quantity
							</label>
							<input
								name="stockQuantity"
								type="number"
								className="bg-four text-black placeholder:text-black w-full text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
								placeholder="Enter stock quantity"
								{...register("stockQuantity")}
							/>
						</div> */}
						{/* <div>
							<label className="text-one text-2xl mb-2 block">
								Choose Category
							</label>
							<select
								{...register("category")}
								className="bg-four text-black placeholder:text-black w-full text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
								defaultValue={product?.category}
							>
								{category.map((cat) => (
									<option value={cat.name} key={cat.name}>
										{cat.name}
									</option>
								))}
							</select>
						</div> */}
						<div>
							<label className="text-one text-2xl mb-2 block">
								Description
							</label>
							<textarea
								name="description"
								type="text"
								className="bg-four text-black placeholder:text-black w-full text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
								placeholder="Enter your product details"
								{...register("description")}
								defaultValue={product?.description}
							/>
						</div>
					</div>

					<div className="!mt-12 flex justify-center">
						<button
							type="submit"
							className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-black bg-three hover:bg-four focus:outline-none"
						>
							Update product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateProduct;
