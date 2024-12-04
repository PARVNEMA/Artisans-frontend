import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ReturnProduct() {
	const { orderId, orderItemId } = useParams();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [reason, setreason] = useState([]);
	const backendurl = import.meta.env.VITE_URL;
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const onFileChange = (e) => {
		setSelectedFiles(e.target.files);
	};
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
				`${backendurl}/order/dispute/Create/${orderId}/${orderItemId}`,
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
				"dispute /return form from user=",
				res.data
			);
			navigate("/");
			toast.succes("Product uploaded successfully");
		} catch (error) {
			console.error("error in register form", error);
		}
	};

	const getAllReasons = async () => {
		const res = await axios.get(
			`${backendurl}/order/dispute/reasons`,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		console.log("Reasons of Return =", res.data);
		setreason(res.data.data);
	};
	useEffect(() => {
		getAllReasons();
	}, []);
	return (
		<div>
			<div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]  bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto py-6 px-[7rem]">
				<div className="text-center mb-16">
					<h1 className="text-three text-4xl font-extrabold mt-6">
						Tell Us About the Product Problem
					</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid sm:grid-cols-2 gap-8">
						<div>
							<label className="text-three font-bold text-2xl mb-2 block">
								Reason
							</label>
							<select
								{...register("reason")}
								className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
							>
								{reason.map((cat) => (
									<option value={cat} key={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-three font-bold text-2xl mb-2 block">
								details
							</label>
							<input
								name="details"
								type="text"
								className="bg-four bg-opacity-75 text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
								placeholder="More Details about return"
								{...register("details")}
							/>
						</div>

						<div>
							<label className="text-three font-bold text-2xl mb-2 block">
								Upload Images
							</label>
							<div classNameName="image-upload-form bg-four">
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
							className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-opacity-90 hover:bg-opacity-80 bg-three focus:outline-none"
						>
							Publish Dispute
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ReturnProduct;
