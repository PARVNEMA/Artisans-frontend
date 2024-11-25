import axios from "axios";
import {
	CalendarRangeIcon,
	Phone,
	User2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
	const [otpmodal, setotpmodal] = useState(false);
	const [otp, setotp] = useState(null);
	const [verified, setverified] = useState(false);
	const [email, setemail] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const backendurl = import.meta.env.VITE_URL;
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		console.log("signup", data);
		data.avatar = data.avatar[0];

		if (verified) {
			try {
				const res = await axios.post(
					`${backendurl}/customers/register`,
					data,
					{
						withCredentials: true, // Ensure cookies are included in the request
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				console.log("res from register backend", res.data);
				navigate("/");
			} catch (error) {
				console.error("error in register form", error);
			}
		} else {
			setotpmodal(true);
			verifyUserEmail();
			toast.error("verify the email first ", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Slide,
			});
		}
	};

	const verifyUserEmail = async () => {
		console.log("otp=", otp);
		console.log("email otp=", email);
		try {
			const res = await axios.post(
				`${backendurl}/customers/send-otp`,
				{ email },
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log("res from send otp ", res.data);
		} catch (error) {
			console.log("error in otp form", error);
		}
	};
	const verifyUserEmail2 = async () => {
		console.log("otp verify=", otp);
		console.log("email  verify otp=", email);
		try {
			const res = await axios.post(
				`${backendurl}/customers/verify-otp`,
				{ email, otp },
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log("res from verify otp ", res.data);
			toast.success("email verified", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setverified(true);
		} catch (error) {
			console.log("error in otp form", error);
		}
	};

	return (
		<>
			<div className="w-auto h-autooverflow-hidden ">
				<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
					<div class="font-[comic sans] ">
						{
							<div
								className={`${
									otpmodal === true ? "block" : "hidden"
								}`}
							>
								{/* You can open the modal using document.getElementById('ID').showModal() method */}

								<dialog
									id="my_modal_3"
									className={`modal ${
										otpmodal === true
											? "modal-open"
											: "hidden"
									}`}
								>
									<div className="modal-box">
										<form method="dialog">
											{/* if there is a button in form, it will close the modal */}
											<button
												className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
												onClick={() => setotpmodal(false)}
											>
												✕
											</button>
										</form>
										<h3 className="font-bold text-lg">
											Verification Code sended to your email
										</h3>
										<p className="py-4">
											<input
												type="string"
												placeholder="Enter Otp"
												className="input input-bordered input-success w-full max-w-xs"
												maxLength={6}
												value={otp}
												onChange={(e) =>
													setotp(e.target.value)
												}
											/>
										</p>
										<button
											type="button"
											onClick={() => {
												setotpmodal(false);
												verifyUserEmail2();
											}}
										>
											Verify
										</button>
									</div>
								</dialog>
							</div>
						}
						<div class="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-white max-w-6xl max-md:max-w-lg m-4 rounded-md p-6 grid md:grid-cols-2 items-center gap-8 h-auto">
							<div class="max-md:order-1 p-4 bg-white h-full">
								<img
									src="https://readymadeui.com/signin-image.webp"
									class="lg:max-w-[90%] w-full h-full object-contain mx-auto"
									alt="login-image"
								/>
							</div>

							<div class="flex flex-col items-center p-6">
								<h3 class="text-blue-500 p-5 md:text-3xl text-2xl font-extrabold max-md:text-center">
									Create an account
								</h3>
								<form
									class="max-w-lg w-full mx-auto"
									onSubmit={handleSubmit(onSubmit)}
								>
									<div>
										<label class="text-gray-800 text-xs mb-2">
											Full Name
										</label>
										<div class="relative flex items-center">
											<input
												name="fullName"
												type="text"
												required
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder="Enter name"
												{...register("fullName")}
											/>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#bbb"
												stroke="#bbb"
												class="w-[18px] h-[18px] absolute right-2"
												viewBox="0 0 24 24"
											>
												<circle
													cx="10"
													cy="7"
													r="6"
													data-original="#000000"
												></circle>
												<path
													d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
													data-original="#000000"
												></path>
											</svg>
										</div>
									</div>
									<div className="mt-6">
										<label
											class="text-gray-800 text-xs mb-2"
											htmlFor="username"
										>
											Username
										</label>
										<div class="relative flex items-center">
											<input
												name="username"
												type="text"
												required
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder="Enter username name"
												{...register("username")}
											/>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#bbb"
												stroke="#bbb"
												class="w-[18px] h-[18px] absolute right-2"
												viewBox="0 0 24 24"
											>
												<circle
													cx="10"
													cy="7"
													r="6"
													data-original="#000000"
												></circle>
												<path
													d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
													data-original="#000000"
												></path>
											</svg>
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs mb-2">
											Email
										</label>
										<div class="relative flex items-center">
											<input
												name="email"
												type="text"
												required
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder="Enter email"
												{...register("email")}
												value={email}
												onChange={(e) =>
													setemail(e.target.value)
												}
											/>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#bbb"
												stroke="#bbb"
												class="w-[18px] h-[18px] absolute right-2"
												viewBox="0 0 682.667 682.667"
											>
												<defs>
													<clipPath
														id="a"
														clipPathUnits="userSpaceOnUse"
													>
														<path
															d="M0 512h512V0H0Z"
															data-original="#000000"
														></path>
													</clipPath>
												</defs>
												<g
													clip-path="url(#a)"
													transform="matrix(1.33 0 0 -1.33 0 682.667)"
												>
													<path
														fill="none"
														stroke-miterlimit="10"
														stroke-width="40"
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

									<div class="mt-6">
										<label class="text-gray-800 text-xs  mb-2">
											Password
										</label>
										<div class="relative flex items-center">
											<input
												name="password"
												type="password"
												required
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder="Enter password"
												{...register("password")}
											/>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#bbb"
												stroke="#bbb"
												class="w-[18px] h-[18px] absolute right-2 cursor-pointer"
												viewBox="0 0 128 128"
											>
												<path
													d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
													data-original="#000000"
												></path>
											</svg>
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs  mb-2">
											Phone Number
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="number"
												required
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="phoneNo"
												placeholder="Enter phone number"
												{...register("phoneNo")}
											/>
											<Phone />
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs  mb-2">
											DOB
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="date"
												required
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="DOB"
												{...register("DOB")}
											/>
											<CalendarRangeIcon />
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs  mb-2">
											Avatar
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="file"
												className="file-input file-input-bordered file-input-info w-full max-w-md"
												name="avatar"
												{...register("avatar")}
											/>
											<User2Icon />
										</div>
									</div>
									<div>
										<div class="flex items-center mt-6">
											<input
												id="remember-me"
												required
												name="remember-me"
												type="checkbox"
												class="h-4 w-4 shrink-0 rounded"
											/>
											<label
												for="remember-me"
												class="ml-3  text-sm text-gray-800"
											>
												I accept the{" "}
												<a
													href="javascript:void(0);"
													class="text-blue-500 font-semibold hover:underline ml-1"
												>
													Terms and Conditions
												</a>
											</label>
										</div>

										<div class="mt-3">
											<button
												type="submit"
												class="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-three hover:bg-two text-white focus:outline-none"
											>
												Create an account
											</button>
											<p class="text-sm mt-4 text-gray-800">
												Already have an account?{" "}
												<a
													href="javascript:void(0);"
													class="text-blue-500 font-semibold hover:underline ml-1"
												>
													Login here
												</a>
											</p>

											{/* verification */}
										</div>
									</div>
								</form>
								<button
									type="button"
									className="btn"
									onClick={() => {
										setotpmodal(true);
										verifyUserEmail();
									}}
								>
									verify email
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
