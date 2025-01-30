import axios from "axios";
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bill() {
	const [cart, setcart] = useState([]);
	const [cartlength, setcartlength] = useState(1);
	const [totalprice, settotalprice] = useState(0);
	const { currency } = useContext(CurrencyContext);
	const [useraddress, setuseraddress] = useState({});
	const [coupon, setcoupon] = useState("");

	const navigate = useNavigate();
	const backendurl = import.meta.env.VITE_URL;
	const getCartItems = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/cart?currency=${currency}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("current order items=", res.data);

			setcart(res.data.data.items);
			settotalprice(res.data.data.totalCartPrice);
			if (res.data.message === "Your cart is empty.") {
				setcartlength(0);
			} else {
				setcartlength(1);
			}
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	const getCurrentUserAddress = useCallback(async () => {
		try {
			const res = await axios.get(`${backendurl}/address`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			console.log("addres in", res.data);
			setuseraddress(res.data.data);
		} catch (error) {
			console.log("Error in getting user address", error);
		}
	}, []);

	const createBill = useCallback(async () => {
		try {
			const res = await axios.post(
				`${backendurl}/order/create-order`,
				{ coupon: coupon },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log("current order Items", res.data);
			if (res.data) {
				navigate("/");
			}
		} catch (error) {
			console.log("Error", error);
			if (error.response.status === 400) {
				toast.error("Out of stock");
			}
		}
	}, []);
	useEffect(() => {
		getCartItems();
		getCurrentUserAddress();
	}, [getCartItems, , currency]);
	var index = 1;
	let toprice = parseFloat(totalprice);
	let shipping = parseFloat(20);
	let tax = parseFloat(10);
	let finalPrice = toprice + shipping + tax;
	return (
		<>
			{cartlength > 0 ? (
				<div className="max-w-[1204px] gap-[46px] mx-auto flex w-full flex-col md:px-5">
					<div class="max-w-4xl max-md:max-w-xl mx-auto p-4">
						<h1 class="text-5xl mt-6 text-center font-extrabold text-three">
							Your Order
						</h1>
					</div>

					{/* Products */}
					<div>
						<div className="w-auto bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
							<div class=" flex justify-between">
								<table className="w-full text-center">
									<tr>
										<th className="text-xl pb-2 underline font-bold text-three">
											SNo.{" "}
										</th>
										<th className="text-xl pb-2 underline font-bold text-three">
											{" "}
											Title{" "}
										</th>
										<th className="text-xl pb-2 underline font-bold text-three">
											Quantity
										</th>
										<th className="text-xl pb-2 underline font-bold text-three">
											Price
										</th>
									</tr>
									{cart?.map((item) => (
										<tr>
											<td className="text-slate-600 p-2 font-medium">
												{index++}.
											</td>
											<td className="text-slate-600 p-2 font-medium">
												{item.title}
											</td>
											<td className="text-slate-600 p-2 font-medium">
												{item.quantity}
											</td>
											<td className="text-black font-medium">
												{currency === "INR"
													? "₹"
													: currency === "USD"
													? "$"
													: "€ "}
												{item.price}
											</td>
										</tr>
									))}
								</table>
							</div>
							<hr class="border-gray-300" />
							{/* Cost total */}
							<ul class="text-gray-800 mt-4 px-4 md:px-8 lg:px-10 xl:px-12 space-y-4">
								<li class="flex flex-wrap gap-4 text-sm">
									Subtotal{" "}
									<span class="ml-auto font-bold">
										{currency === "INR"
											? "₹"
											: currency === "USD"
											? "$"
											: "€ "}
										{totalprice}
									</span>
								</li>
								<li class="flex flex-wrap gap-4 text-sm">
									Shipping{" "}
									<span class="ml-auto font-bold">
										{currency === "INR"
											? "₹"
											: currency === "USD"
											? "$"
											: "€ "}
										{shipping}
									</span>
								</li>
								<li class="flex flex-wrap gap-4 text-sm">
									Tax{" "}
									<span class="ml-auto font-bold">
										{currency === "INR"
											? "₹"
											: currency === "USD"
											? "$"
											: "€ "}
										{tax}
									</span>
								</li>
								<hr class="border-gray-300" />
								<li class="flex flex-wrap gap-4 text-sm font-bold">
									Total{" "}
									<span class="ml-auto">
										{currency === "INR"
											? "₹"
											: currency === "USD"
											? "$"
											: "€ "}
										{finalPrice}
									</span>
								</li>
							</ul>
						</div>
					</div>

					{/* address */}
					<div>
						{Object.keys(useraddress).length === 0 ? (
							<>
								<div>
									please add Your Address First
									<Link to={"/address"}>
										<button className="btn btn-outline">
											Address
										</button>
									</Link>
								</div>
							</>
						) : (
							<div>
								<div className="w-auto bg-white mb-4 rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
									<div>
										<ul class="text-gray-800 mx-12 space-y-4">
											<li class="flex flex-wrap gap-4 text-sm">
												Address
												<span class="ml-auto font-bold">
													{useraddress?.address}
												</span>
											</li>
											<li class="flex flex-wrap gap-4 text-sm">
												country
												<span class="ml-auto font-bold">
													{useraddress?.country}
												</span>
											</li>
											<li class="flex flex-wrap gap-4 text-sm">
												state
												<span class="ml-auto font-bold">
													{useraddress?.state}
												</span>
											</li>
											<li class="flex flex-wrap gap-4 text-sm">
												city
												<span class="ml-auto font-bold">
													{useraddress?.city}
												</span>
											</li>
											<hr class="border-gray-300" />
											<li class="flex flex-wrap gap-4 text-sm font-bold">
												Pincode
												<span class="ml-auto">
													{useraddress?.zipCode}
												</span>
											</li>
										</ul>
										{/* show modal */}
										<div class="mt-8 mx-12 space-y-2">
											<button
												class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-three hover:bg-opacity-80 text-white rounded-md"
												onClick={() =>
													document
														.getElementById("my_modal_1")
														.showModal()
												}
											>
												Proceed
											</button>
											<dialog
												id="my_modal_1"
												className="modal"
											>
												<div className="modal-box">
													<h3 className="font-bold text-3xl">
														Confirmation!
													</h3>
													<p className="py-4 text-lg">
														Confirm you order
													</p>
													<div className="modal-action">
														<form method="dialog">
															<div className="flex gap-8">
																<button className="btn bg-one text-xl">
																	Close
																</button>
																<button
																	className="btn bg-three opacity-75 text-white text-xl"
																	onClick={createBill}
																>
																	Confirm
																</button>
															</div>
														</form>
													</div>
												</div>
											</dialog>
										</div>

										<div class="mt-4 flex flex-wrap justify-center gap-4">
											<img
												src="https://readymadeui.com/images/master.webp"
												alt="card1"
												class="w-10 object-contain"
											/>
											<img
												src="https://readymadeui.com/images/visa.webp"
												alt="card2"
												class="w-10 object-contain"
											/>
											<img
												src="https://readymadeui.com/images/american-express.webp"
												alt="card3"
												class="w-10 object-contain"
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="h-full w-full mb-20 flex flex-col justify-center items-center">
					<img
						src="/images/empty_cart.png"
						className="h-[30rem] w-[30rem]"
					/>
					<div className=" text-4xl italic font-serif">
						Looks like there is nothing in the cart !!
					</div>
				</div>
			)}
		</>
	);
}

export default Bill;
