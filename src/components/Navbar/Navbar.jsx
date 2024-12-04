import React, {
	useCallback,
	useContext,
	useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../useContext/loginContext";
import { useEffect } from "react";
import axios from "axios";
import { useAuthArtisans } from "../../../useContext/ArtisansContext";
import { Searchform } from "../search/Searchform";
import GTranslateLoader from "../Translate/GTranslateLoader";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { HeartIcon } from "lucide-react";
import { toast } from "react-toastify";
function Navbar() {
	const backendurl = import.meta.env.VITE_URL;
	// const [artisans, setArtisans] = useState(null);
	// const [user, setuser] = useState(null);
	let location = useLocation();
	console.log(location.pathname);
	const [results, setresults] = useState([]);
	const [category, setcategory] = useState([]);
	const { loggedIn, setloggedIn, user, setUser } =
		useAuth();
	const {
		artisansloggedIn,
		setartisansloggedIn,
		artisans,
		setArtisans,
	} = useAuthArtisans();
	const { currency, setCurrency } =
		useContext(CurrencyContext);
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
							"accessToken"
						)}`,
					},
				}
			);
			console.log("res in getcurrent user", res.data);
			// setuser(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	const getAllCategories = async () => {
		const res = await axios.get(`${backendurl}/category`, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(
					"accessToken"
				)}`,
			},
		});
		console.log("categories =", res.data);
		setcategory(res.data.data);
	};
	const refreshaccessToken = async () => {
		const res = await axios.get(
			`${backendurl}/customers/refresh-token`,
			{
				refreshToken: localStorage.getItem("refreshToken"),
			},
			{
				withCredentials: true,
				headers: { ContentType: "application/json" },
			}
		);
		console.log("new Token generated =", res.data);
		if (res.data.accessToken) {
			localStorage.setItem(
				"accessToken",
				res.data.accessToken
			);
			localStorage.setItem(
				"refreshToken",
				res.data.refreshToken
			);
		}
	};
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	useEffect(() => {
		if (localStorage.getItem("refreshToken")) {
			refreshaccessToken();
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem("artisansaccessToken")) {
			setartisansloggedIn(true);
			getCurrentArtisans();
		}
		if (localStorage.getItem("accessToken")) {
			setloggedIn(true);
			getCurrentUser();
		}
		getAllCategories();
	}, [getCurrentArtisans, getCurrentUser]);
	useEffect(() => {
		if (user || artisans) {
			setloggedIn(!!localStorage.getItem("accessToken"));
			setartisansloggedIn(
				!!localStorage.getItem("artisansaccessToken")
			);
		}
	}, [user, artisans]);
	const logout = async () => {
		const res = await axios.post(
			`${backendurl}/customers/logout`,
			null,
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		if (res) {
			setloggedIn(false);
			setUser(null);
		}
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		toast.success("Logout successfully");
		console.log("logout", res);
	};
	const artisanslogout = async () => {
		const res = await axios.post(
			`${backendurl}/artisans/logout`,
			null,
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"artisansaccessToken"
					)}`,
				},
			}
		);
		setartisansloggedIn(false);
		setArtisans(null);
		localStorage.removeItem("artisansaccessToken");
		toast.success("Logout successfully");
		console.log("logout artisans", res);
	};
	const navigate = useNavigate();
	const handleSelectChange = (event) => {
		const selectedPage = event.target.value;
		navigate(selectedPage);
	};
	const handleSearch = async (searchTerm) => {
		console.log("Search term:", searchTerm);
		try {
			const res = await axios.get(
				`${backendurl}/products/search/${searchTerm}`
			);
			console.log("res of search", res.data);
			setresults(res.data.data);
		} catch (error) {
			setresults([]);
			console.log("error in search", error);
		}
		useEffect(() => {
			handleSearch(searchTerm);
		}, handleSearch);
	};
	return (
		<div className="h-[5rem] flex justify-center z-40 sticky top-0 bg-four bg-opacity-60 shadow-md">
			{" "}
			<div className="navbar flex justify-between items-center w-full p-2">
				{" "}
				<div className="flex items-center">
					{" "}
					<Link to="/">
						{" "}
						<img
							className="ml-3 h-[5rem] w-[6rem]"
							src="/public/images/Elegant Peacock Indian Wedding Logo (3).png"
							alt="Logo"
						/>{" "}
					</Link>{" "}
					<GTranslateLoader />{" "}
					<div className="xl:hidden ml-5 sm:ml-10">
						{" "}
						<select
							name="page"
							id="page-select"
							className="text-three rounded-lg p-2 outline-none"
							onChange={handleSelectChange}
							value={location.pathname}
						>
							{" "}
							<option value="/">Home</option>{" "}
							<option value="/artisans/page">
								Artisans
							</option>{" "}
							{artisansloggedIn && (
								<option value="/artisans/dashboard">
									Dashboard
								</option>
							)}
							<option value="/products">Products</option>{" "}
							<option value="/aboutus">About Us</option>{" "}
							<option value="/contactus">Contact Us</option>{" "}
						</select>{" "}
					</div>{" "}
					<div className="hidden xl:flex items-center text-three font-semibold text-xl space-x-8 ml-10">
						{" "}
						<Link to="/">Home</Link>{" "}
						<div className="relative">
							{" "}
							<button
								onClick={toggleMenu}
								className="focus:outline-none"
							>
								{" "}
								Categories{" "}
							</button>{" "}
							{menuOpen && (
								<ul className="absolute left-0 mt-2 w-52 bg-white border rounded-md shadow-lg z-50">
									{" "}
									{category.map((cat) => (
										<li
											key={cat._id}
											className="text-black text-sm p-2 hover:bg-gray-200"
										>
											{" "}
											<a
												href={`/category/${cat._id}`}
												className="flex items-center"
											>
												{" "}
												<img
													src={cat.categoryImage}
													alt={cat.name}
													className="h-6 w-6 mr-2"
												/>{" "}
												{cat.name}{" "}
											</a>{" "}
										</li>
									))}{" "}
								</ul>
							)}{" "}
						</div>{" "}
						<Link to="/artisans/page">Artisans</Link>{" "}
						{artisansloggedIn && (
							<Link to="/artisans/dashboard">
								Dashboard
							</Link>
						)}{" "}
						<Link to="/products">Products</Link>{" "}
						<Link to="/aboutus">About Us</Link>{" "}
						<Link to="/contactus">Contact Us</Link>{" "}
					</div>{" "}
				</div>{" "}
				<div className="flex items-center space-x-4">
					{" "}
					<div id="searchBar" className="relative">
						{" "}
						<Searchform onSearch={handleSearch} />{" "}
						{results && (
							<ul className="absolute top-[4rem] text-center bg-gray-200 rounded-md shadow-lg z-40 w-[20rem] text-three">
								{" "}
								{results.map((result, index) => (
									<li
										key={index}
										className="p-2 hover:bg-stone-400"
									>
										{" "}
										<Link
											to={`/productdetails/${result._id}`}
											className="flex items-center space-x-2"
										>
											{" "}
											<img
												src={result.images[0]}
												className="h-6 w-6"
												alt={result.title}
											/>{" "}
											<span>{result.title}</span>{" "}
										</Link>{" "}
									</li>
								))}{" "}
							</ul>
						)}{" "}
					</div>{" "}
					<select
						className="text-white bg-three text-lg bg-opacity-60 hover:bg-opacity-80 p-2 rounded-md"
						name="currency"
						onChange={(e) => {
							setCurrency(e.target.value);
							toast.success("Currency Changed");
						}}
						value={currency}
					>
						{" "}
						<option value="INR">INR</option>{" "}
						<option value="USD">USD</option>{" "}
						<option value="EUR">EUR</option>{" "}
					</select>{" "}
					{loggedIn && (
						<Link
							to="/wishlist"
							className="text-black hover:bg-three text-center hover:bg-opacity-10 p-3 rounded-full"
						>
							{" "}
							<HeartIcon />{" "}
						</Link>
					)}{" "}
					<div className="relative">
						{" "}
						<Link
							to="/cart"
							className={`p-3 rounded-full hover:bg-opacity-60 bg-three bg-opacity-40 ${
								loggedIn ? "flex" : "hidden"
							}`}
						>
							{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="black"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{" "}
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>{" "}
							</svg>{" "}
						</Link>{" "}
					</div>{" "}
					{!loggedIn && !artisansloggedIn && (
						<>
							{" "}
							<Link
								to="/aa"
								className=" bg-three p-3 rounded-lg hover:bg-opacity-90 text-center text-lg text-white"
							>
								Sign In
							</Link>{" "}
							<Link
								to="/aaa"
								className=" bg-three p-3 rounded-lg hover:bg-opacity-85 text-lg text-center text-white"
							>
								Sign Up
							</Link>{" "}
						</>
					)}{" "}
					{loggedIn || artisansloggedIn ? (
						<div className="dropdown dropdown-end">
							{" "}
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								{" "}
								<div className="w-10 rounded-full">
									{" "}
									{loggedIn && user?.avatar && (
										<img
											src={user.avatar}
											alt="User Profile"
										/>
									)}{" "}
									{artisansloggedIn && artisans?.avatar && (
										<img
											src={artisans?.avatar}
											alt="user"
										/>
									)}{" "}
								</div>{" "}
							</div>{" "}
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 p-2 shadow z-50 bg-one font-semibold text-lg text-three rounded-box w-52"
							>
								{" "}
								<li>
									{" "}
									<Link
										className="justify-between"
										to="/userprofile"
									>
										Profile
										<span className="badge">New</span>
									</Link>{" "}
								</li>{" "}
								{artisansloggedIn ? (
									<li>
										{" "}
										<Link to="/" onClick={artisanslogout}>
											Logout
										</Link>{" "}
									</li>
								) : (
									<li>
										{" "}
										<Link to="/" onClick={logout}>
											Logout
										</Link>{" "}
									</li>
								)}{" "}
							</ul>{" "}
						</div>
					) : (
						<div className="flex items-center space-x-2"></div>
					)}{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
}

export default Navbar;
