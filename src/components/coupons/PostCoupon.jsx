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
      await axios.post(`${backendurl}/admin/nastrigo/Coupans/Create`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminaccessToken")}`,
        },
      });
      navigate("/admin");
      toast.success("Coupon added successfully");
    } catch (error) {
      console.error("Error in address form:", error);
      toast.error("Failed to add coupon. Please try again.");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="shadow-lg bg-white max-md:max-w-lg m-8 rounded-md grid gap-8 h-auto max-w-4xl mx-auto py-6 px-8">
      <div className="text-center">
        <h1 className="text-three text-3xl font-bold mt-6">
          Enter Your Coupon Details to Add
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-three text-2xl mb-2 block">Code</label>
            <input
              name="code"
              type="text"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Code"
              {...register("code", {
                required: "Code is required",
              })}
            />
            {errors.code && (
              <span className="text-red-500">{errors.code.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">
              Discount Type
            </label>
            <select
              name="discountType"
              id=""
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              onChange={(e) => setValue("discountType", e.target.value)}
              defaultValue={"percentage"}
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>

            {errors.discountType && (
              <span className="text-red-500">
                {errors.discountType.message}
              </span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">
              Discount Value
            </label>
            <input
              name="discountValue"
              type="text"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Discount Value"
              {...register("discountValue", {
                required: "Discount Value is required",
              })}
            />
            {errors.discountValue && (
              <span className="text-red-500">
                {errors.discountValue.message}
              </span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">
              Minimum Purchase
            </label>
            <input
              name="minPurchase"
              type="number"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Minimum Purchase"
              {...register("minPurchase", {
                required: "Minimum Purchase is required",
              })}
            />
            {errors.minPurchase && (
              <span className="text-red-500">{errors.minPurchase.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">
              Maximum Discount
            </label>
            <input
              name="maxDiscount"
              type="number"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Maximum Discount"
              {...register("maxDiscount", {
                required: "Maximum Discount is required",
              })}
            />
            {errors.maxDiscount && (
              <span className="text-red-500">{errors.maxDiscount.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">Valid From</label>
            <input
              name="validFrom"
              type="date"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Valid From"
              {...register("validFrom", {
                required: "Valid From is required",
              })}
            />
            {errors.validFrom && (
              <span className="text-red-500">{errors.validFrom.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl mb-2 block">Valid Till</label>
            <input
              name="validTill"
              type="date"
              className="bg-one text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter Valid Till"
              {...register("validTill", {
                required: "Valid Till is required",
              })}
            />
            {errors.validTill && (
              <span className="text-red-500">{errors.validTill.message}</span>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-three hover:bg-opacity-70 focus:outline-none"
          >
            Publish Coupon
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCoupon;
