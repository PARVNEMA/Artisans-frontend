import axios from "axios";
import {
	BookAIcon,
	BookHeartIcon,
	CalendarRangeIcon,
	Phone,
	User2Icon,
} from "lucide-react";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function UpdateArtisanProfile() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const backendurl = import.meta.env.VITE_URL;
	const navigate = useNavigate();
	const [artisans, setartisans] = useState(null);

	const getCurrentArtisans = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/artisans/detail`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"res in getcurrent artisans update Profile =",
				res.data
			);
			setartisans(res.data.data.artisan);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	useEffect(() => {
		getCurrentArtisans();
	}, []);

	const onSubmit = async (data) => {
		console.log("update artisans profile", data);

		try {
			const res = await axios.post(
				`${backendurl}/artisans/update`,
				data,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("res from update backend", res.data);
			navigate("/artisans/dashboard");
			toast("Aritsans Profile Updated successfully", {
				type: "success",
			});
		} catch (error) {
			console.error("error in register form", error);
		}
	};

	return (
		<>
			<div className="w-auto h-autooverflow-hidden ">
				<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
					<div class="font-[comic sans]">
						<div class="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-white max-w-6xl max-md:max-w-lg m-4 rounded-md p-6 grid md:grid-cols-2 items-center gap-8 h-auto">
							<div class="max-md:order-1 p-4 bg-white h-full">
								<img
									src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg?t=st=1732882004~exp=1732885604~hmac=b9d297c67256d7cf94fac61c382a7969e6c7839311a81b421b289e9a2f727294&w=740"
									class="lg:max-w-[90%] w-full h-full object-contain mx-auto"
									alt="login-image"
								/>
							</div>

							<div class="flex flex-col items-center p-6">
								<h3 class="text-three p-4 md:text-3xl text-2xl font-extrabold max-md:text-center">
									Edit Your Artisans Profile
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
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder={artisans?.fullName}
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
												class="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												placeholder={artisans?.username}
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
											Phone Number
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="number"
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="phoneNo"
												placeholder={artisans?.phoneNo}
												{...register("phoneNo")}
											/>
											<Phone />
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs mb-2">
											DOB
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="date"
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="DOB"
												defaultValue={artisans?.DOB}
												{...register("DOB")}
											/>
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs mb-2">
											About
										</label>
										<div class="relative flex items-center justify-between">
											<input
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="about"
												placeholder={artisans?.about}
												{...register("about")}
											/>
											<BookAIcon />
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs mb-2">
											Experience
										</label>
										<div class="relative flex items-center justify-between">
											<input
												type="number"
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="experience"
												placeholder={artisans?.experience}
												{...register("experience")}
											/>
											<BookHeartIcon />
										</div>
									</div>
									<div class="mt-6">
										<label class="text-gray-800 text-xs mb-2">
											GSTIN
										</label>
										<div class="relative flex items-center justify-between">
											<input
												className=" w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
												name="GSTIN"
												placeholder={artisans?.GSTIN}
												{...register("GSTIN")}
											/>
											<CalendarRangeIcon />
										</div>
									</div>

									<div>
										<div class="flex items-center mt-6">
											<input
												id="remember-me"
												name="remember-me"
												type="checkbox"
												class="h-4 w-4 shrink-0 rounded"
											/>
											<label
												for="remember-me"
												class="ml-3 text-sm text-gray-800"
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
												class="w-full py-2.5 px-5 text-sm font-semibold rounded-md text-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-three focus:outline-none  hover:shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)]"
											>
												Update account Details
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateArtisanProfile;
