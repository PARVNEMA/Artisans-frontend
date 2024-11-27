import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ProductListing() {
	// State to manage images
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [category, setcategory] = useState([]);
	const navigate = useNavigate();
	const onFileChange = (e) => {
		setSelectedFiles(e.target.files);
	}; // Single preview for each image
	const backendurl = import.meta.env.VITE_URL;
	// React Hook Form setup
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Handle file selection and set preview for single image

	// Add image to the list of images

	// Submit handler

	const onSubmit = async (data) => {
		const formData = new FormData();

		// Append form fields to FormData, ensuring both key and value are specified
		Object.keys(data).forEach((key) => {
			if (key !== "images") {
				console.log("each key", key, data[key]);
				formData.append(key, data[key]);
			}
		});

		// Append selected images to FormData
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append("images", selectedFiles[i]);
		}

		// Debugging: Log FormData entries to verify
		for (let pair of formData.entries()) {
			console.log(pair[0] + ": " + pair[1]);
		}

		try {
			const res = await axios.post(
				`${backendurl}/products/create`,
				formData,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${localStorage.getItem(
							"artisanaccessToken"
						)}`,
					},
				}
			);

			console.log(
				"res from uploading product from artisanss",
				res.data
			);
			navigate("/artisans/dashboard");
		} catch (error) {
			console.error("error in register form", error);
		}
	};

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
		<div>
			<div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]  bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto font-[sans-serif] py-6 px-[7rem]">
				<div className="text-center mb-16">
					<a href="javascript:void(0)">
						<img
							src="../images/logo2.png"
							alt="logo"
							className="w-52 inline-block"
						/>
					</a>
					<h1 className="text-one text-3xl font-bold mt-6">
						List your product on our website
					</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid sm:grid-cols-2 gap-8">
						<div>
							<label className="text-one text-2xl mb-2 block">
								Title
							</label>
							<input
								name="title"
								type="text"
								className="bg-five  text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
								placeholder="Enter the product title"
								{...register("title")}
							/>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Price
							</label>
							<input
								name="price"
								type="number"
								className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
								placeholder="Enter price"
								{...register("price")}
							/>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Stock Quantity
							</label>
							<input
								name="stockQuantity"
								type="number"
								className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
								placeholder="Enter stock quantity"
								{...register("stockQuantity")}
							/>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Choose Category
							</label>
							<select
								{...register("category")}
								className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
							>
								{category.map((cat) => (
									<option value={cat.name} key={cat.name}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Description
							</label>
							<textarea
								name="description"
								type="text"
								className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
								placeholder="Enter your product details"
								{...register("description")}
							/>
						</div>
						<div>
							<label className="text-one text-2xl mb-2 block">
								Upload Images
							</label>
							<div classNameName="image-upload-form bg-five">
								<input
									type="file"
									multiple
									{...register("images")}
									onChange={onFileChange}
								/>
							</div>
						</div>
					</div>

					<div className="!mt-12 flex justify-center">
						<button
							type="submit"
							className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-three hover:bg-five focus:outline-none"
						>
							Publish product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProductListing;
