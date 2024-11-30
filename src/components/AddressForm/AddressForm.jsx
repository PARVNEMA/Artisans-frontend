import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddressForm() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState(""); // Reset the state when country changes
    setValue("country", country); // Update the form value
    console.log("Country changed to:", country);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setValue("state", state); // Update the form value
    console.log("State changed to:", state);
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  async function getCountries() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const names = response.data.map((country) => country.name.common);
      setCountryNames(names);
      console.log("Fetched country names:", names);
    } catch (error) {
      console.error("Error fetching country names:", error);
    }
  }

  const onSubmit = async (data) => {
    console.log("Data in address form:", data);
    const backendurl = import.meta.env.VITE_URL;
    try {
      await axios.post(`${backendurl}/address`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/");
      toast.success("Address added successfully");
    } catch (error) {
      console.error("Error in address form:", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    setValue("country", selectedCountry);
    setValue("state", selectedState);
  }, [selectedCountry, selectedState, setValue]);

  return (
    <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto py-6 px-[7rem]">
      <div className="text-center mb-16">
        <h1 className="text-three text-5xl font-extrabold mt-6">
          Enter Your Complete Address
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-three text-2xl font-bold mb-2 block">
              Address
            </label>
            <input
              name="address"
              type="text"
              className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl font-bold mb-2 block">
              City
            </label>
            <input
              name="city"
              type="text"
              className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder="Enter city"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl font-bold mb-2 block">
              State
            </label>
            {selectedCountry === "India" ? (
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name="state"
                type="text"
                className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
                placeholder="Enter state"
                {...register("state", { required: "State is required" })}
              />
            )}
            {errors.state && (
              <span className="text-red-500">{errors.state.message}</span>
            )}
          </div>
          <div>
            <label className="text-three text-2xl font-bold mb-2 block">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue={selectedCountry}
              render={({ field }) => (
                <select
                  {...field}
                  value={selectedCountry}
                  onChange={(event) => {
                    field.onChange(event);
                    handleCountryChange(event);
                  }}
                  className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
                >
                  <option value="">Select Country</option>
                  {countryNames.map((c) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>
          <div>
            <label className="text-three font-bold text-2xl mb-2 block">
              {selectedCountry === "India" ? "Pincode" : "Zipcode"}
            </label>
            <input
              name="zipCode"
              type="text"
              className="bg-four bg-opacity-75  text-three placeholder:text-three w-full text-sm px-4 py-3.5 rounded-md focus:bg-opacity-50 outline-blue-500 transition-all"
              placeholder={`Enter ${
                selectedCountry === "India" ? "Pincode" : "Zipcode"
              }`}
              {...register("zipCode", {
                required: `${
                  selectedCountry === "India" ? "Pincode" : "Zipcode"
                } is required`,
              })}
            />
            {errors.zipCode && (
              <span className="text-red-500">{errors.zipCode.message}</span>
            )}
          </div>
        </div>

        <div className="!mt-12 flex justify-center">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-three bg-opacity-90 hover:bg-opacity-80 focus:outline-none"
          >
            Publish product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
