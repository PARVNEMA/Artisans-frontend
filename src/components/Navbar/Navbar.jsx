import React ,{useState}from "react";
import { Link } from "react-router-dom";

function Navbar() {
const [searchTerm,setsearchTerm]=useState([])
const[results,setresult]=useState([])
const [isWishlisted, setIsWishlisted] = useState(false);

// Toggle wishlist state
const toggleWishlist = () => {
  setIsWishlisted(!isWishlisted);
};


const handleChange=(e)=>{
	setsearchTerm(e.target.value);
}
const handleSearch=()=>{
	const filterResult=data.filter(item=>
		item.toLowerCase().includes(searchTerm.toLowerCase())
	)
	setresult(filterResult)
}
	return (
		<div className="w-[100v]">
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
									Craft
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
						{/**<a href="../ErrorPage/ErrorPage.jsx">Three</a>*/}
						{/*<a href="../ErrorPage/ErrorPage.jsx">Four</a>*/}
						<Link to="/contactus">ContactUs</Link>
						{/*<a href="../ErrorPage/ErrorPage.jsx">*/}
						<Link to ="/aboutus">About Us</Link>
						
					</div>
				</div>
				<div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <input 
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
		
      />
	  <svg
        onClick={handleSearch} // Trigger search on click
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill="#000"
        style={{ cursor: 'pointer' }}
      >
        <path d="M10 2a8 8 0 106.32 13.91l4.41 4.38a1 1 0 001.41-1.41l-4.38-4.41A8 8 0 0010 2zm0 2a6 6 0 11-6 6 6 6 0 016-6z"/>
      </svg>
      <ul style={{ marginTop: '10px', paddingLeft: '0' }}>
        {results.map((result, index) => (
          <li key={index} style={{ listStyleType: 'none', padding: '5px 0' }}>{result}</li>
        ))}
      </ul>
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
					{/*
					<div style={{ display: 'flex', alignItems: 'center' }}>
           <svg
        onClick={toggleWishlist}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill={isWishlisted ? 'red' : 'gray'} // Change color when wishlisted
        style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      
      <span style={{ marginLeft: '10px', color: isWishlisted ? 'red' : 'black' }}>
       {/** {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
      </span>
    </div>
	*/}
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
