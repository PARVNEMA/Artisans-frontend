import axios from "axios";
import React, { useEffect, useState } from "react";

import { useArtisansAuth } from "../../../../useContext/ArtisansContext.jsx";
import { Link } from "react-router-dom";

function Dashboard() {
  const { dispatch, state } = useArtisansAuth();
  const backendurl = import.meta.env.VITE_URL;
  const [artisansproducts, setartisansproducts] = useState([]);
  const [artisansmatrices, setartisansmatrices] = useState(null);

  const getArtisansProduct = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/products/artisan/${state.artisansData._id}`,
        {
          withCredentials: true, // Ensure cookies are included in the request
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "artisansaccessToken"
            )}`,
          },
        }
      );
      console.log("current artisans products", res.data);
      setartisansproducts(res.data.data);
    } catch (error) {
      console.error("error in dashbooard ", error);
    }
  };
  const getArtisansSellerMetrices = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/artisans/matrices/${state.artisansData._id}`,
        {
          withCredentials: true, // Ensure cookies are included in the request
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "artisansaccessToken"
            )}`,
          },
        }
      );
      console.log("current artisans metrices", res.data);
      setartisansmatrices(res.data.data);
    } catch (error) {
      console.error("error in dashbooard ", error);
    }
  };

  // console.log(state);

  useEffect(() => {
    console.log("State on mount or update:", state);
    if (state.isLoggedIn) {
      console.log("User is logged in, fetching products...");
      getArtisansProduct();
      getArtisansSellerMetrices();
    }
  }, [state.isLoggedIn, state.artisansData._id]);

  return (
    <div>
      <div className="flex items-center w-full">
        {/* Header */}
        <div className="w-[85%] pl-[8rem]">
          <h1 className="text-5xl font-bold uppercase text-center mt-10 mb-3">
            Welcome !! {state.artisansData.fullName}
          </h1>
          <p className="font-semibold text-center">Here is your dashboard</p>
        </div>

        {/* Add new product */}
        <div className="bg-three hover:bg-two rounded-full flex justify-center">
          <Link to={"/artisans/productlisting"}>
            <button className="p-5 font-bold ">Add new product</button>
          </Link>
        </div>
      </div>

      {/* artisans matrices */}
      {artisansmatrices && (
        <div className="flex justify-center p-auto">
          <div className="grid grid-cols-4 mx-[8rem] my-20 gap-20">
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Total Products</h2>
			  <p className="text-xl">
				{/* {artisansmatrices.metrics.totalProducts} */}
				0
				</p>
            </div>
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Customer satisfaction</h2>
              <p className="text-xl">{artisansmatrices.metrics.customerSatisfaction}</p>
            </div>
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Dispute Rate</h2>
              <p className="text-xl">{artisansmatrices.metrics.disputeRate}</p>
            </div>
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Product Selling Rate</h2>
              <p className="text-xl">{artisansmatrices.metrics.productSellingRate}</p>
            </div>
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Refund Rate</h2>
              <p className="text-xl">{artisansmatrices.metrics.refundRate}</p>
            </div>
            <div className="h-auto shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] rounded-3xl bg-five hover:bg-three w-auto flex flex-col p-12 gap-5 justify-center items-center text-center">
              <h2 className="text-xl ">Return Rate</h2>
              <p className="text-xl">{artisansmatrices.metrics.returnRate}</p>
            </div>
          </div>
        </div>
      )}

      {/* artisans products */}
      <div>
        <div className="text-3xl text-center">Your Products</div>
        {artisansproducts.map((product) => (
          <div>
            <p>{product.title}</p>
            <img src={product.images} alt="" className="h-14 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
