import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddressForm() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset the state when country changes
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
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
    } catch (error) {
      console.error("Error fetching country names:", error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Data in address=", data);
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
      console.error("error in address form", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-white max-md:max-w-lg m-8 rounded-md md:grid-cols-2 items-center gap-8 h-auto max-w-4xl mx-auto font-[sans-serif] py-6 px-[7rem]">
      <div className="text-center mb-16">
        <a href="javascript:void(0)">
          <img
            src="../images/logo2.png"
            alt="logo"
            className="w-52 inline-block"
          />
        </a>
        <h1 className="text-one text-3xl font-bold mt-6">
          Enter Your Complete Address
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-one text-2xl mb-2 block">Address</label>
            <input
              name="address"
              type="text"
              className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
              placeholder="Enter address"
              {...register("address")}
            />
          </div>
          <div>
            <label className="text-one text-2xl mb-2 block">City</label>
            <input
              name="city"
              type="text"
              className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
              placeholder="Enter city"
              {...register("city")}
            />
          </div>
          <div>
            <label className="text-one text-2xl mb-2 block">State</label>
            {selectedCountry === "India" ? (
              <select
                value={selectedState}
                onChange={handleStateChange}
                {...register("state")}
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
              >
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
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
                placeholder="Enter state"
                {...register("state")}
              />
            )}
          </div>
          <div>
            <label className="text-one text-2xl mb-2 block">Country</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              {...register("country")}
              className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
            >
              {countryNames.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-one text-2xl mb-2 block">
              {selectedCountry === "India" ? "Pincode" : "Zipcode"}
            </label>
            <input
              name="zipcode"
              type="text"
              className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
              placeholder={`Enter ${
                selectedCountry === "India" ? "Pincode" : "Zipcode"
              }`}
              {...register("zipCode")}
            />
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
  );
}

export default AddressForm;
