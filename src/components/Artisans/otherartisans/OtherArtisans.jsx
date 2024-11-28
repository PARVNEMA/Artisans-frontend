import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DonutChart from "../../DonutChart/DonutChart";
import { IndianRupee } from "lucide-react";

function OtherArtisans() {
  let { artisanid } = useParams();
  const backendurl = import.meta.env.VITE_URL;
  const [artisans, setArtisans] = useState({});
  const [artisansmatrices, setArtisansMatrices] = useState(null);

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
      <div className="text-black flex flex-col mx-[10rem] my-5 gap-[3rem]">
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
            {/* <p>{artisans?.GSTIN}</p> */}
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

        <div>
          <h1 className="text-3xl font-bold text-center">Artisan Metrics</h1>
          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col items-center">
              <DonutChart value={artisansmatrices?.customerSatisfaction} />
              <p>Customer Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <DonutChart value={artisansmatrices?.disputeRate} />
              <p>Dispute Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <DonutChart value={artisansmatrices?.productSellingRate} />
              <p>Sales Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <DonutChart value={artisansmatrices?.refundRate} />
              <p>Refund Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <DonutChart value={artisansmatrices?.returnRate} />
              <p>Return Rate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[10rem] text-start">
        <div className="text-3xl font-bold text-center p-8">
          Artist's Other Products
        </div>
        {artisansproducts.map((product) => (
          <Link to={`/productdetails/${product._id}`}>
            <div className="grid grid-cols-4 justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row">
              <img src={product.images[0]} alt="" className="object-fill" />
              <div className="flex flex-col justify-between">
                <h2 className="text-xl uppercase">
                  <b>Title:</b> {product.title}
                </h2>
                <p className="text-md uppercase">
                  <b>Category:</b> {product.category.name}
                </p>
              </div>
              <p className="text-lg">
                <b className="uppercase">Description:</b> {product.description}
              </p>
              <div className="text-start flex lg:block">
                <p className="text-lg font-bold uppercase">Price:</p>
                <div className="text-lg flex items-center">
                  <IndianRupee /> {product.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OtherArtisans;
