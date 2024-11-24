import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddressForm() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [countryName, setcountryName] = useState([]);
  const navigate = useNavigate();

//   function to handle country change
  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
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

//   rest api to get country names
  async function getCountries() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const Names = response.data.map((country) => country.name.common);
      setcountryName(Names);
    } catch (error) {
      console.error("Error fetching country names:", error);
    }
  }

  // React Hook Form setup
  const {
    user,
    address,
    city,
    state,
    country,
    zipcode,
    formState: { errors },
  } = useForm();

  // Submit handler
  const handleSubmit = () => {
    console.log("Form Submitted");
  };

  useEffect(() => {
    getCountries();
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
            Enter Your Complete Address
          </h1>
        </div>

        <form onSubmit={handleSubmit()}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-one text-2xl mb-2 block">User</label>
              <input
                name="user"
                type="text"
                className="bg-five  text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
                placeholder="Enter user"
                // {...register("title")}
              />
            </div>
            <div>
              <label className="text-one text-2xl mb-2 block">Address</label>
              <input
                name="address"
                type="text"
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
                placeholder="Enter address"
                // {...register("price")}
              />
            </div>
            <div>
              <label className="text-one text-2xl mb-2 block">City</label>
              <input
                name="city"
                type="text"
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
                placeholder="Enter city"
                // {...register("stockQuantity")}
              />
            </div>
            <div>
              <label className="text-one text-2xl mb-2 block">State</label>
              {selectedCountry == "India" ? (
                <select value={selectedState} onChange={handleStateChange}
                  // {...register("category")}
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
                  // {...register("stockQuantity")}
                />
              )}
            </div>
            <div>
              <label className="text-one text-2xl mb-2 block">Country</label>
              <select
                value={selectedCountry}
                onChange={handleChange}
                // {...register("category")}
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
              >
                {countryName.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-one text-2xl mb-2 block">
				{selectedCountry == "India" ? "Pincode" : "Zipcode"}
			  </label>
              <input
                name="zipcode"
                type="text"
                className="bg-five text-white placeholder:text-white w-full text-sm px-4 py-3.5 rounded-md focus:bg-three outline-blue-500 transition-all"
                placeholder={`Enter ${selectedCountry == "India" ? "Pincode" : "Zipcode"}`}
                // {...register("stockQuantity")}
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
    </div>
  );
}

export default AddressForm;
