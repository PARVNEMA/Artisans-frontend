import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../useContext/loginContext";
import { useEffect } from "react";
import axios from "axios";
import { useAuthArtisans } from "../../../useContext/ArtisansContext";
import { Searchform } from "../search/Searchform";
import GTranslateLoader from "../Translate/GTranslateLoader";
import { set } from "lodash";
import { CurrencyContext } from "../../../useContext/CurrencyContext";
import { HeartHandshakeIcon, HeartIcon } from "lucide-react";
import { toast } from "react-toastify";

function Navbar() {
  const backendurl = import.meta.env.VITE_URL;

  const [artisans, setArtisans] = useState(null);
  const [user, setuser] = useState(null);

  let location = useLocation();
  console.log(location.pathname);

  const [results, setresults] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [category, setcategory] = useState([]);
  // const [currency, setcurrency] = useState("INR");
  const { loggedIn, setloggedIn } = useAuth();
  const { artisansloggedIn, setartisansloggedIn } = useAuthArtisans();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const getCurrentArtisans = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/artisans/current-user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "artisansaccessToken"
          )}`,
        },
      });
      console.log("res in getcurrent artisans", res.data);
      setArtisans(res.data.data);
      setartisansloggedIn(true);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const getCurrentUser = useCallback(async () => {
    try {
      const res = await axios.get(`${backendurl}/customers/current-user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "artisansaccessToken"
          )}`,
        },
      });
      console.log("res in getcurrent artisans", res.data);
      setuser(res.data.data);
      console.log("user=", user);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);
  const getAllCategories = async () => {
    const res = await axios.get(`${backendurl}/category`, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("categories =", res.data);
    setcategory(res.data.data);
  };

  useEffect(() => {
    if (localStorage.getItem("artisansaccessToken")) {
      getCurrentArtisans();
      setartisansloggedIn(true);
    }
    if (localStorage.getItem("accessToken")) {
      setloggedIn(true);
      getCurrentUser();
    }
    getAllCategories();
  }, [getCurrentArtisans, getCurrentUser]);

  const logout = async () => {
    const res = await axios.post(`${backendurl}/customers/logout`, null, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (res) {
      setloggedIn(false);
    }

    localStorage.removeItem("accessToken");
    toast.success("Logout successfully");
    console.log("logout", res);
  };
  const artisanslogout = async () => {
    const res = await axios.post(`${backendurl}/artisans/logout`, null, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("artisansaccessToken")}`,
      },
    });

    setartisansloggedIn(false);

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
    // Implement your search logic here, such as making API calls
    console.log("Search term:", searchTerm);
    try {
      const res = await axios.get(
        `${backendurl}/products/search/${searchTerm}`
      );
      console.log("res of search", res.data);
      setresults(res.data.data);
      console.log("results", res.data.data);
    } catch (error) {
      console.log("error in search", error);
    }
  };
  return (
    <div
      className="h-[5rem] flex justify-center "
      style={{ backgroundColor: "#25362c" }}
    >
      <div className="navbar flex justify-between p-2 ">
        <div className="flex-1">
          <Link to={"/"}>
            <img
              className="ml-3 h-[5rem] w-[6rem]"
              src="../../../public/images/logo1.png"
              alt="Logo"
            />
          </Link>
          <GTranslateLoader />
          <div className="xl:hidden ml-10">
            {" "}
            <select
              name="page"
              id="page-select"
              className="bg-three text-black rounded-lg p-2 outline-none"
              onChange={handleSelectChange}
            >
              {" "}
              <option value="/">Home</option>{" "}
              <option value="/category"></option>
              <option value="/artisans/page">Artisans</option>{" "}
              <option value="/product">Products</option>{" "}
              <option value="/aboutus">About Us</option>{" "}
              <option value="/contactus">Contact Us</option>{" "}
            </select>{" "}
          </div>
          <div className=" text-[#F5F5DC] font-medium w-[40rem] justify-evenly p-2 hidden xl:flex ">
            <Link href="/">Home</Link>
            <div>
              <div className="dropdown dropdown-hover ">
                <div tabIndex={0} role="button" className="btn-ghost ">
                  Categories
                </div>
                <ul
                  id="dropdownMenu"
                  class="dropdown-content menu border bg-five rounded-box z-[1] w-52 shadow text-black"
                >
                  {category.map((cat) => (
                    <li
                      class="rounded-md text-black
									text-sm cursor-pointer "
                    >
                      <a href={`/category/${cat._id}`}>
                        <img
                          src={cat.categoryImage}
                          alt=""
                          height={50}
                          width={50}
                        />
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link to="/artisans/page">Artisans</Link>
            {artisans && <Link to="/artisans/dashboard">Dashboard</Link>}
            <Link to="/products">Products</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contactus">ContactUs</Link>
          </div>
        </div>

        <div className="">
          <div id="searchBar" className="p-2 m-2 rounded-lg bg-white">
            <Searchform onSearch={handleSearch} />
          </div>
          {results ? (
            <ul className="absolute top-[4.5rem] z-10 bg-white text-black">
              {results.map((result, index) => (
                <li
                  key={index}
                  style={{
                    listStyleType: "none",
                    padding: "5px 0",
                  }}
                >
                  <Link
                    to={`/productdetails/${result._id}`}
                    className="flex p-1 gap-2 truncate"
                  >
                    <img src={result.images[0]} className="h-6 w-6" />
                    <div>{result.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex justify-end p-5 w-[25%]">
          <select
            className="text-black p-2 rounded-sm mr-4 bg-four"
            name="currency"
            id=""
            onChange={(e) => {
              setCurrency(e.target.value);
              toast.success("Currency Changed");
            }}
            value={currency}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          {loggedIn ? (
            <div>
              <Link to={"/wishlist"}>
                <HeartIcon />
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-5 hover:bg-five btn-circle justify-center bg-three ${
                loggedIn ? "flex" : "hidden"
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
              loggedIn || artisansloggedIn ? "hidden" : "flex"
            }`}
          >
            <Link to={"/aa"}>
              <button className="btn bg-four">SignIn</button>
            </Link>
          </div>

          <div
            className={`dropdown dropdown-end m-4 ${
              loggedIn || artisansloggedIn ? "hidden" : "flex"
            }`}
          >
            <Link to={"/aaa"}>
              <button className="btn bg-four">SignUp</button>
            </Link>
          </div>
          <div
            className={`dropdown dropdown-end ${
              loggedIn || artisansloggedIn ? "flex" : "hidden"
            }`}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              style={{ color: "black" }}
            >
              <div className="w-10 rounded-full">
                {loggedIn && (
                  <img src={user?.avatar} alt="user" height={10} width={10} />
                )}
                {artisansloggedIn && (
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
              className="menu menu-sm dropdown-content bg-two rounded-box z-[1] mt-14 w-52 p-2 shadow"
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
              {artisansloggedIn ? (
                <li>
                  <Link to={"/"} onClick={artisanslogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to={"/"} onClick={logout}>
                    Logout
                  </Link>
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
