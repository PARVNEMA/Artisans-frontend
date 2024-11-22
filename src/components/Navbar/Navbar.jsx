import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../useContext/loginContext";
import { useEffect } from "react";
import axios from "axios";
import { useArtisansAuth } from "../../../useContext/ArtisansContext";
function Navbar() {
	const backendurl = import.meta.env.VITE_URL;

	const [artisans, setArtisans] = useState(null);
	const [user, setuser] = useState(null);

	const [logIn, setLogIn] = useState(false);
	const [artisanslogin, setartisanslogin] = useState(false);

	const getCurrentArtisans = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/artisans/current-user`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("res in getcurrent artisans", res.data);
			setArtisans(res.data.data);
			setartisanslogin(true);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	const getCurrentUser = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/customers/current-user`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log("res in getcurrent artisans", res.data);
			setuser(res.data.data);
			console.log("user=", user);

			setLogIn(true);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem("artisansaccessToken")) {
			getCurrentArtisans();
		}
		if (localStorage.getItem("accessToken")) {
			getCurrentUser();
		}
	}, [getCurrentArtisans]);

	const logout = async () => {
		const res = await axios.post(
			`${backendurl}/customers/logout`,
			null,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		if (res) {
			setLogIn(false);
		}

		localStorage.removeItem("accessToken");

		console.log("logout", res);
	};
	const artisanslogout = async () => {
		const res = await axios.post(
			`${backendurl}/artisans/logout`,
			null,
			{
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"artisansaccessToken"
					)}`,
				},
			}
		);

		setartisanslogin(false);

		localStorage.removeItem("artisansaccessToken");

		console.log("logout artisans", res);
	};

	let location = useLocation();
	console.log(location.pathname);
	const [searchTerm, setsearchTerm] = useState([]);
	const [results, setresult] = useState([]);
	const [isWishlisted, setIsWishlisted] = useState(false);

	// Toggle wishlist state
	const toggleWishlist = () => {
		setIsWishlisted(!isWishlisted);
	};

	const handleChange = (e) => {
		setsearchTerm(e.target.value);
	};
	const handleSearch = () => {
		const filterResult = data.filter((item) =>
			item.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setresult(filterResult);
	};
	useEffect(() => {});
	return (
		<div className="w-full h-[5rem] flex justify-center ">
			<div className="navbar flex justify-between p-2">
				<div className="flex-1">
					<Link to={"/"}>
						<img
							className="ml-3 h-[6rem] w-[16rem]"
							src="../../../public/images/logo1.png"
							alt="Logo"
						/>
					</Link>

					<div className=" text-amber-100 font-medium w-[40rem] justify-evenly p-2 hidden lg:flex">
						<Link href="/">Home</Link>
						<div>
							<div className="dropdown dropdown-hover ">
								<div
									tabIndex={0}
									role="button"
									className="btn-ghost "
								>
									Craft
								</div>
								<ul
									id="dropdownMenu"
									class="dropdown-content menu border bg-five rounded-box z-[1] w-52 p-2 shadow text-black"
								>
									<li
										class="py-3 px-6 hover:bg-three rounded-md text-black
									text-sm cursor-pointer "
									>
										Furniture Store
									</li>
									<li class="py-3 px-6 hover:bg-three rounded-md text-black text-sm cursor-pointer ">
										Electronic Store
									</li>
									<li class="py-3 px-6 hover:bg-three rounded-md text-black text-sm cursor-pointer ">
										Fashion Store
									</li>
									<li class="py-3 px-6 hover:bg-three rounded-md text-black text-sm cursor-pointer ">
										Shoes Store
									</li>
								</ul>
							</div>
						</div>
						<Link to="/artisans/page">Artisans</Link>
						{artisans && (
							<Link to="/artisans/dashboard">
								Dashboard
							</Link>
						)}
						<Link to="/products">Products</Link>
						<Link to="/aboutus">About Us</Link>
						<Link to="/contactus">ContactUs</Link>
					</div>
				</div>
				<div
					style={{
						padding: "20px",
						maxWidth: "400px",
						margin: "20px",
					}}
				>
					<input
						type="text"
						value={searchTerm}
						onChange={handleChange}
						className="rounded-full mr-5 text-black hidden lg:flex"
						placeholder="Search..."
						style={{
							width: "100%",
							padding: "12px",
							marginBottom: "3px",
						}}
					/>
					<svg
						onClick={handleSearch} // Trigger search on click
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 25 25"
						width="40px"
						height="40px"
						fill="white"
						style={{ cursor: "pointer" }}
					>
						<path d="M10 2a8 8 0 106.32 13.91l4.41 4.38a1 1 0 001.41-1.41l-4.38-4.41A8 8 0 0010 2zm0 2a6 6 0 11-6 6 6 6 0 016-6z" />
					</svg>
					<ul
						style={{ marginTop: "10px", paddingLeft: "0" }}
					>
						{results.map((result, index) => (
							<li
								key={index}
								style={{
									listStyleType: "none",
									padding: "5px 0",
								}}
							>
								{result}
							</li>
						))}
					</ul>
				</div>
				<div className="flex justify-end p-5 w-[25%]">
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className={`btn m-5 hover:bg-five btn-circle justify-center bg-three ${
								logIn ? "flex" : "hidden"
							}`}
						>
							<div className={`indicator`}>
								<Link to={"/cart"}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="black"
										viewBox="0 0 24 24"
										stroke="currentColor"
										style={{ color: "white" }}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>

					<div
						className={`dropdown dropdown-end m-4 ${
							logIn || artisanslogin ? "hidden" : "flex"
						}`}
					>
						<Link to={"/aa"}>
							<button className="btn bg-four">Login</button>
						</Link>
					</div>

					<div
						className={`dropdown dropdown-end m-4 ${
							logIn || artisanslogin ? "hidden" : "flex"
						}`}
					>
						<Link to={"/aaa"}>
							<button className="btn bg-four">
								SignUp
							</button>
						</Link>
					</div>
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
							style={{ color: "black" }}
						>
							<div className="w-10 rounded-full">
								{logIn && (
									<img
										src={user?.avatar}
										alt="user"
										height={10}
										width={10}
									/>
								)}
								{artisanslogin && (
									<img
										src={artisans?.avatar}
										alt="user"
										height={10}
										width={10}
									/>
								)}
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-two rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<Link
									className="justify-between"
									to={"/userprofile"}
									style={{ backgroundColor: "five" }}
								>
									Profile
									<span className="badge">New</span>
								</Link>
							</li>
							{artisanslogin ? (
								<li>
									<a onClick={artisanslogout}>Logout</a>
								</li>
							) : (
								<li>
									<a onClick={logout}>Logout</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
