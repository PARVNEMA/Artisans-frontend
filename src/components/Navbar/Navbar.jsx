import React ,{useState}from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
function Navbar() {
	let location = useLocation();
  console.log(location.pathname);
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
		<div className="w-[100vw] h-[5rem] flex justify-center">
			<div className="navbar bg-base-100 flex justify-between">
				<div className="flex-1">
					<Link to={"/"}>
						<img
							className="h-[5rem] w-[16rem]"
							src="../../../public/images/logo2.png"
							alt="Logo"
						/>
					</Link>
					
					<div className="flex text-black font-semibold  mx-[10rem] w-[40rem] justify-evenly">
						<a href="/">Home</a>
						<div>
							<div className="dropdown dropdown-hover">
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
						<Link to="/contactus">ContactUs</Link>
						<Link to ="/aboutus">About Us</Link>
						<Link to="/artisans/page">Artisans</Link>
						
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
								<Link className="justify-between" to={'/userprofile'}>
									Profile
									<span className="badge">New</span>
								</Link>
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
