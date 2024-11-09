import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div>
			<div className="navbar bg-base-100 flex justify-between">
				<div className="flex-1">
					<Link to={"/"}>
						<img
							className="h-[4rem] w-[14rem]"
							src="../../../public/images/logo1.jpg"
							alt="Logo"
						/>
					</Link>
					<div className="flex text-black font-semibold  mx-[10rem] w-[40rem] justify-evenly">
						<a href="/">Home</a>
						<div>
							<div className="dropdown dropdown-hover dropdown-end">
								<div
									tabIndex={0}
									role="button"
									className="btn-ghost "
								>
									Hover
								</div>
								<ul
									id="dropdownMenu"
									class="dropdown-content menu bg-gray-100 rounded-box z-[1] w-52 p-2 shadow text-black"
								>
									<li class="py-3 px-6 hover:bg-gray-100 text-black text-sm cursor-pointer">
										Furniture Store
									</li>
									<li class="py-3 px-6 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
										Electronic Store
									</li>
									<li class="py-3 px-6 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
										Fashion Store
									</li>
									<li class="py-3 px-6 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
										Shoes Store
									</li>
								</ul>
							</div>
						</div>
						<a href="../ErrorPage/ErrorPage.jsx">Three</a>
						<a href="../ErrorPage/ErrorPage.jsx">Four</a>
						<a href="../ErrorPage/ErrorPage.jsx">Five</a>
						<a href="../ErrorPage/ErrorPage.jsx">
							About Us
						</a>
					</div>
				</div>
				<div className="flex w-[25%]">
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle"
						>
							<div className="indicator">
								<Link to={"/cart"}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
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
					<div className="dropdown dropdown-end m-4">
						<Link to={"/login"}>
							<button className="btn btn-primary">
								Login
							</button>
						</Link>
					</div>
					<div className="dropdown dropdown-end m-4">
						<Link to={"/signup"}>
							<button className="btn btn-primary">
								SignUp
							</button>
						</Link>
					</div>
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
