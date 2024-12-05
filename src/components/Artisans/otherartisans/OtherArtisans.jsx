import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DonutChart from "../../DonutChart/DonutChart";
import { IndianRupee } from "lucide-react";
import { CurrencyContext } from "../../../../useContext/CurrencyContext";

function OtherArtisans() {
  let { artisanid } = useParams();
  const backendurl = import.meta.env.VITE_URL;
  const [artisans, setArtisans] = useState({});
  const [artisansmatrices, setArtisansMatrices] = useState(null);
  const {currency} = useContext(CurrencyContext);
  const [artisansproducts, setArtisansProducts] = useState([]);
  const getArtisansProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/products/artisansproducts/${artisanid}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "artisansaccessToken"
            )}`,
          },
        }
      );
      console.log("current artisans products", res.data);
      setArtisansProducts(res.data.data);
    } catch (error) {
      console.error("error in dashboard ", error);
    }
  }, []);

  const getCurrentArtisans = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/artisans/detail/${artisanid}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "artisansaccessToken"
            )}`,
          },
        }
      );
      console.log(" getcurrent artisans in other artisans", res.data.data);
      setArtisans(res.data.data.artisan);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  const getArtisansSellerMetrices = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendurl}/artisans/matrices/${artisanid}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "artisansaccessToken"
            )}`,
          },
        }
      );
      console.log("current artisans metrices", res.data);
      setArtisansMatrices(res.data.data.metrics);
    } catch (error) {
      console.error("error in dashboard ", error);
    }
  }, [artisans?._id]);
  useEffect(() => {
    getCurrentArtisans();
    getArtisansSellerMetrices();
    getArtisansProduct();
  }, []);
  return (
    <div>
      <div className="text-black flex flex-col mx-[8rem] my-5 gap-[3rem]">
        <h1 className="text-3xl font-bold text-center">About the Artist</h1>
        <div className="flex w-full justify-between">
          <div>
            <h1 className="text-xl">
              <b>Name:</b> {artisans?.fullName}
            </h1>
            <p className="text-xl">
              <b>DOB:</b> {artisans?.DOB?.toString().slice(0, 10)}
            </p>
            <p className="text-xl">
              <b>Experience:</b> {artisans?.experience}
            </p>
            <p className="text-xl">
              <b>About:</b> {artisans?.about}
            </p>
            <p className="text-xl">
              <b>Verified:</b> {artisans?.isVerified ? "Yes" : "No"}
            </p>
            <p className="text-xl">
              <b>Email:</b> {artisans?.email}
            </p>
          </div>
          <img src={artisans?.avatar} alt="" />
        </div>
        <div className="mt-12">
          {" "}
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-8">
            Artisan Metrics
          </h1>{" "}
          <div className="flex flex-wrap justify-center gap-12">
            {" "}
            <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg text-white">
              {" "}
              <DonutChart value={artisansmatrices?.customerSatisfaction} />{" "}
              <p className="mt-4 font-bold">Customer Satisfaction</p>{" "}
            </div>{" "}
            <div className="flex flex-col items-center bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-lg shadow-lg text-white">
              {" "}
              <DonutChart value={artisansmatrices?.disputeRate} />{" "}
              <p className="mt-4 font-bold">Dispute Rate</p>{" "}
            </div>{" "}
            <div className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-lg text-white">
              {" "}
              <DonutChart value={artisansmatrices?.productSellingRate} />{" "}
              <p className="mt-4 font-bold">Sales Rate</p>{" "}
            </div>{" "}
            <div className="flex flex-col items-center bg-gradient-to-r from-red-500 to-red-300 p-6 rounded-lg shadow-lg text-white">
              {" "}
              <DonutChart value={artisansmatrices?.refundRate} />{" "}
              <p className="mt-4 font-bold">Refund Rate</p>{" "}
            </div>{" "}
            <div className="flex flex-col items-center bg-gradient-to-r from-yellow-500 to-yellow-300 p-6 rounded-lg shadow-lg text-white">
              {" "}
              <DonutChart value={artisansmatrices?.returnRate} />{" "}
              <p className="mt-4 font-bold">Return Rate</p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="mx-[10rem] text-start">
        <div className="text-4xl text-three font-extrabold text-center p-8">
          Artist's Other Products
        </div>
        <div className="overflow-x-auto mb-12">
          {" "}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            {" "}
            <thead className="bg-four text-white">
              {" "}
              <tr>
                {" "}
                <th className="py-3 px-6 font-semibold uppercase">SNO</th>{" "}
                <th className="py-3 px-6 font-semibold uppercase">Image</th>{" "}
                <th className="py-3 px-6 font-semibold uppercase">Title</th>{" "}
                <th className="py-3 px-6 font-semibold uppercase">Category</th>{" "}
                <th className="py-3 px-6 font-semibold uppercase">
                  Description
                </th>{" "}
                <th className="py-3 px-6 font-semibold uppercase">Price</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {artisansproducts.map((product, i) => (
                <tr
                  key={product._id}
                  className="bg-white border-b hover:bg-gray-100 transition-all"
                >
                  {" "}
                  <td className="py-3 px-6 border text-center">
                    {i + 1}.
                  </td>{" "}
                  <td className="py-3 px-6 border flex justify-center">
                    {" "}
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-16 w-16 object-fill rounded-full"
                    />{" "}
                  </td>{" "}
                  <td className="py-3 px-6 text-center border">
                    {product.title}
                  </td>{" "}
                  <td className="py-3 px-6 text-center border">
                    {product.category.name}
                  </td>{" "}
                  <td className="py-3 px-6 text-center border">
                    {product.description}
                  </td>{" "}
                  <td className="py-3 px-6 text-center">
                    {" "}
                    {currency === "INR"
                      ? "₹"
                      : currency === "USD"
                      ? "$"
                      : "€"}{" "}
                    {product.price}{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default OtherArtisans;
