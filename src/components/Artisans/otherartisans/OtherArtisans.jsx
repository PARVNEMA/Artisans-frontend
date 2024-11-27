import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DonutChart from "../../DonutChart/DonutChart";

function OtherArtisans() {
  let { artisanid } = useParams();
  const backendurl = import.meta.env.VITE_URL;
  const [artisans, setArtisans] = useState({});
  const [artisansmatrices, setArtisansMatrices] = useState(null);

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
  }, []);
  return (
    <div className="text-black flex flex-col mx-[10rem] my-5 gap-[3rem]">
      <h1 className="text-3xl font-bold text-center">About the Artist</h1>
      <div className="flex w-full justify-between ">
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
            <p>Return Rte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherArtisans;
