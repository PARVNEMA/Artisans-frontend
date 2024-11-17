import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function ProductListing() {
	// State to manage images
	const [selectedFiles, setSelectedFiles] = useState([]);
	const onFileChange = (e) => {
		setSelectedFiles(e.target.files);
	}; // Single preview for each image
	const backendurl = import.meta.env.VITE_URL;
	// React Hook Form setup
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Handle file selection and set preview for single image

	// Add image to the list of images

	// Submit handler
	const onSubmit = async (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key !== "images") {
				formData.append(data[key]);
			}
		});
		console.log("signup", formData);

		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append("images", selectedFiles[i]);
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
							"accessToken"
						)}`,
					},
				}
			);

			console.log(
				"res from uploading product from artisanss",
				res.data
			);
		} catch (error) {
			console.error("error in register form", error);
		}
	};

	return (
		<div>
			<div class="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]  bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto font-[sans-serif] py-6 px-[7rem]">
				<div class="text-center mb-16">
					<a href="javascript:void(0)">
						<img
							src="../images/logo2.png"
							alt="logo"
							class="w-52 inline-block"
						/>
					</a>
					<h1 class="text-gray-800 text-3xl font-bold mt-6">
						List your product on our website
					</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div class="grid sm:grid-cols-2 gap-8">
						<div>
							<label class="text-gray-800 text-2xl mb-2 block">
								Title
							</label>
							<input
								name="title"
								type="text"
								class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter the product title"
								{...register("title")}
							/>
						</div>
						<div>
							<label class="text-gray-800 text-2xl mb-2 block">
								Price
							</label>
							<input
								name="price"
								type="number"
								class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter price"
								{...register("price")}
							/>
						</div>
						<div>
							<label class="text-gray-800 text-2xl mb-2 block">
								Stock Quantity
							</label>
							<input
								name="stockQuantity"
								type="number"
								class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter stock quantity"
								{...register("stockQuantity")}
							/>
						</div>
						<div>
							<label class="text-gray-800 text-2xl mb-2 block">
								Choose Category
							</label>
							<input
								name="category"
								type="password"
								class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="category"
								{...register("category")}
							/>
						</div>
						<div>
							<label class="text-gray-800 text-2xl mb-2 block">
								Description
							</label>
							<textarea
								name="description"
								type="text"
								class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
								placeholder="Enter your product details"
								{...register("description")}
							/>
						</div>
						<div>
							<div className="image-upload-form">
								<input
									type="file"
									multiple
									{...register("images")}
									onChange={onFileChange}
								/>
							</div>
						</div>
					</div>

					<div class="!mt-12 flex justify-center">
						<button
							type="submit"
							class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
