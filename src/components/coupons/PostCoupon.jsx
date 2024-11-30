import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostCoupon() {
	const navigate = useNavigate();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		console.log("Data in coupon form ", data);
		const backendurl = import.meta.env.VITE_URL;
		try {
			await axios.post(
				`${backendurl}/admin/nastrigo/Coupans/Create`,
				data,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			navigate("/admin");
			toast.success("coupon added successfully");
		} catch (error) {
			console.error("Error in address form:", error);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto font-[sans-serif] py-6 px-[7rem]">
			<div className="text-center mb-16">
				<a href="#">
					<img
						src="../images/logo2.png"
						alt="logo"
						className="w-52 inline-block"
					/>
				</a>
				<h1 className="text-one text-3xl font-bold mt-6">
					Enter Your Coupon Details to add
				</h1>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid sm:grid-cols-2 gap-8">
					<div>
						<label className="text-one text-2xl mb-2 block">
							Code
						</label>
						<input
							name="Code"
							type="text"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter Code"
							{...register("code", {
								required: "Code is required",
							})}
						/>
						{errors.Code && (
							<span className="text-red-500">
								{errors.Code.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							discountType
						</label>
						<select
							name="discountType"
							id=""
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							onChange={(e) =>
								setValue("discountType", e.target.value)
							}
						>
							<option value="percentage">percentage</option>
							<option value="flat">flat</option>
						</select>

						{errors.discountType && (
							<span className="text-red-500">
								{errors.discountType.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							discountValue
						</label>
						<input
							name="discountValue"
							type="text"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter discountValue"
							{...register("discountValue", {
								required: "discountValue is required",
							})}
						/>
						{errors.discountValue && (
							<span className="text-red-500">
								{errors.discountValue.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							minPurchase
						</label>
						<input
							name="minPurchase"
							type="number"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter discountValue"
							{...register("minPurchase", {
								required: "minPurchase is required",
							})}
						/>
						{errors.minPurchase && (
							<span className="text-red-500">
								{errors.minPurchase.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							maxDiscount
						</label>
						<input
							name="maxDiscount"
							type="number"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter discountValue"
							{...register("maxDiscount", {
								required: "maxDiscount is required",
							})}
						/>
						{errors.maxDiscount && (
							<span className="text-red-500">
								{errors.maxDiscount.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							validFrom
						</label>
						<input
							name="validFrom"
							type="date"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter validFrom"
							{...register("validFrom", {
								required: "validFrom is required",
							})}
						/>
						{errors.validFrom && (
							<span className="text-red-500">
								{errors.validFrom.message}
							</span>
						)}
					</div>
					<div>
						<label className="text-one text-2xl mb-2 block">
							validTill
						</label>
						<input
							name="validTill"
							type="date"
							className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-one outline-blue-500 transition-all"
							placeholder="Enter validTill"
							{...register("validTill", {
								required: "validTill is required",
							})}
						/>
						{errors.validTill && (
							<span className="text-red-500">
								{errors.validTill.message}
							</span>
						)}
					</div>
				</div>

				<div className="!mt-12 flex justify-center">
					<button
						type="submit"
						className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-one hover:bg-five focus:outline-none"
					>
						Publish product
					</button>
				</div>
			</form>
		</div>
	);
}

export default PostCoupon;
