import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductListing() {
	// State to manage images
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [category, setcategory] = useState([]);
	const [loading, setloading] = useState(false);

	const navigate = useNavigate();
	const onFileChange = (e) => {
		setSelectedFiles(e.target.files);
	}; // Single preview for each image
	const backendurl = import.meta.env.VITE_URL;
	// React Hook Form setup
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const isCustomization = watch("isCustomization");

	// Handle file selection and set preview for single image

	// Add image to the list of images

	// Submit handler

	const onSubmit = async (data) => {
		setloading(true);
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
			setloading(false);
			toast.succes("Product uploaded successfully");
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
		<div className="p-6">
			{" "}
			<div className="shadow-lg bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto py-6 px-8 md:px-16">
				{" "}
				<div className="text-center mb-16">
					{" "}
					<h1 className="text-three text-4xl font-extrabold mt-6">
						{" "}
						List your product on our website{" "}
					</h1>{" "}
				</div>{" "}
				<form onSubmit={handleSubmit(onSubmit)}>
					{" "}
					<div className="grid sm:grid-cols-2 gap-8">
						{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Title{" "}
							</label>{" "}
							<input
								name="title"
								type="text"
								required
								className="bg-opacity-75 bg-four text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
								placeholder="Enter the product title"
								{...register("title")}
							/>{" "}
						</div>{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Price{" "}
							</label>{" "}
							<input
								name="price"
								type="number"
								required
								className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
								placeholder="Enter price"
								{...register("price")}
							/>{" "}
						</div>{" "}
						<div>
							{" "}
							<h1 className="text-three font-bold text-xl mb-2 block">
								{" "}
								Are you offering customization?{" "}
							</h1>{" "}
							<div className="flex flex-col">
								{" "}
								<div>
									{" "}
									<input
										id="yes"
										type="radio"
										name="isCustomization"
										value="true"
										{...register("isCustomization")}
										onChange={() =>
											setValue("isCustomization", "true")
										}
										className="text-three mr-2"
									/>{" "}
									<label
										htmlFor="yes"
										className="text-three font-bold"
									>
										{" "}
										Yes{" "}
									</label>{" "}
								</div>{" "}
								<div>
									{" "}
									<input
										id="no"
										type="radio"
										name="isCustomization"
										value="false"
										{...register("isCustomization")}
										onChange={() =>
											setValue("isCustomization", "false")
										}
										className="text-three mr-2"
									/>{" "}
									<label
										htmlFor="no"
										className="text-three font-bold"
									>
										{" "}
										No{" "}
									</label>{" "}
								</div>{" "}
							</div>{" "}
						</div>{" "}
						{isCustomization === "true" && (
							<div>
								{" "}
								<label className="text-three font-bold text-xl mb-2 block">
									{" "}
									Customization Price{" "}
								</label>{" "}
								<input
									name="customizationPrice"
									type="number"
									className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
									placeholder="Enter price"
									{...register("customizationPrice")}
								/>{" "}
							</div>
						)}{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Stock Quantity{" "}
							</label>{" "}
							<input
								name="stockQuantity"
								type="number"
								required
								className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
								placeholder="Enter stock quantity"
								{...register("stockQuantity")}
							/>{" "}
						</div>{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Choose Category{" "}
							</label>{" "}
							<select
								required
								{...register("category")}
								className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
							>
								{" "}
								{category.map((cat) => (
									<option value={cat.name} key={cat.name}>
										{" "}
										{cat.name}{" "}
									</option>
								))}{" "}
							</select>{" "}
						</div>{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Description{" "}
							</label>{" "}
							<textarea
								name="description"
								type="text"
								required
								className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-none transition-all"
								placeholder="Enter your product details"
								{...register("description")}
							/>{" "}
						</div>{" "}
						<div>
							{" "}
							<label className="text-three font-bold text-xl mb-2 block">
								{" "}
								Upload Images{" "}
							</label>{" "}
							<div className="bg-four p-4 rounded-md">
								{" "}
								<input
									type="file"
									multiple
									required
									{...register("images")}
									onChange={onFileChange}
									className="text-three w-full"
								/>{" "}
							</div>{" "}
						</div>{" "}
					</div>{" "}
					<div className="mt-12 flex justify-center">
						{" "}
						{loading ? (
							<div className="flex">
								<p>Loading...</p>
								<Loader2 className="text-three animate-spin " />
							</div>
						) : (
							<button
								type="submit"
								className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-opacity-90 hover:bg-opacity-80 bg-three focus:outline-none transition duration-300"
							>
								{" "}
								Publish Product{" "}
							</button>
						)}
					</div>{" "}
				</form>{" "}
			</div>{" "}
		</div>
	);
}

export default ProductListing;
