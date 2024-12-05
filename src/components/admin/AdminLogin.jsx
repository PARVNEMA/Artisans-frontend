import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
  const backendurl = import.meta.env.VITE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`${backendurl}/admin/nastrigo/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("res from admin login backend", res.data);
      localStorage.setItem("adminaccessToken", res.data.data.accessToken);
      navigate("/admin");
      toast("Login successfully", { type: "success" });
    } catch (error) {
      console.error("error in login form", error);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-one p-4">
      <div className="shadow-lg max-w-6xl bg-white max-md:max-w-lg rounded-lg p-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="hidden md:block">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:w-11/12 w-full object-cover rounded-lg"
              alt="login-image"
            />
          </div>

          <form
            className="md:max-w-md w-full mx-auto space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <h3 className="text-4xl font-extrabold text-three mb-6">
                Sign in
              </h3>
            </div>

            <div>
              <div className="relative flex items-center mb-6">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-three px-2 py-3 outline-none transition-colors"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div>
              <div className="relative flex items-center mb-6">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-three px-2 py-3 outline-none transition-colors"
                  placeholder="Enter password"
                  {...register("password")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  onClick={() => setShowPassword(!showPassword)}
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-5 text-sm font-semibold rounded-md text-white shadow-md bg-three hover:bg-opacity-90 transition-all focus:outline-none"
              >
                Sign in
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                Don't have an account?{" "}
                <Link
                  to={"/adminsignup"}
                  className="text-three font-semibold hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
