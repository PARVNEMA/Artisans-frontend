import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";
import PostCoupon from "../coupons/PostCoupon";
import GetCoupons from "../coupons/GetCoupons";
import { useNavigate } from "react-router-dom";

function AdminHome() {
	const [currentartisans, setcurrentartisans] = useState(
		[]
	);
	const [bannedArtisans, setbannedArtisans] = useState([]);
	const navigate = useNavigate();
	const [totalArtisans, setTotalArtisans] = useState(0);
	const [currentusers, setcurrentusers] = useState(0);

	const backendurl = import.meta.env.VITE_URL;
	const getProductAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/product-analytics`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current product analytics=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	const getSalesAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/sales-analytics`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Sales analytics=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			// toast.error(error.message);
		}
	}, []);
	const getFinanceAnalytics = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/financial-overview`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Finance analytics=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			// toast.error(error.message);
		}
	}, []);
	var index = 1;
	const getActiveArtisansDetails = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/registered-artisans`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active Artisans analytics=",
				res.data.data
			);
			setTotalArtisans(res.data.data.totalArtisans);
			setcurrentartisans(res.data.data.activeArtisans);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	const getActiveUserDetails = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/registered-customers`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active User analytics=",
				res.data.data
			);
			setcurrentusers(res.data.data);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	const getBannedArtisans = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/getDisabledArtisanAccount`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Ban Active User analytics=",
				res.data.data
			);
			setbannedArtisans(res.data.data);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	const adminlogout = useCallback(async () => {
		try {
			const res = await axios.post(
				`${backendurl}/admin/nastrigo/logout`,
				null,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log("logout admin", res.data.data);
			// setcurrentusers(res.data.data);
			localStorage.removeItem("adminaccessToken");
			toast.success("Logout successfully");
			navigate("/");
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);

	const BanArtisan = useCallback(async (artisanId) => {
		try {
			const res = await axios.put(
				`${backendurl}/admin/nastrigo/disable/${artisanId}`,
				null,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active Artisans ban=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	const unBanArtisan = useCallback(async (artisanId) => {
		try {
			const res = await axios.put(
				`${backendurl}/admin/nastrigo/activate/${artisanId}`,
				null,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"current Active Artisans unban=",
				res.data.data
			);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);
	useEffect(() => {
		getProductAnalytics();
		getSalesAnalytics();
		getFinanceAnalytics();
		getActiveArtisansDetails();
		getActiveUserDetails();
		getBannedArtisans();
	}, []);

	return (
    <div>
      <h1 className="text-4xl text-center font-bold font-serif m-2 ">
        Admin Home Main
      </h1>
      <button onClick={adminlogout} className="btn btn-error">
        Logout
      </button>
      {/* calling active artisans */}
      <div className="w-[100vw] flex justify-center text-center">
        <table className="border border-solid border-black">
          <tr className="p-3 border border-solid border-black">
            <th className="w-16 border border-solid border-black uppercase">
              SNO
            </th>
            <th className="w-64 border border-solid border-black uppercase">
              ID
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              Avatar
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              fullName
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              username
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              email
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              phoneNo
            </th>
          </tr>
          {currentartisans.map((artisan) => (
            <tr className="p-3 border border-solid border-black">
              <td className="border border-solid border-black">{index++}</td>
              <td className="border border-solid border-black">
                {artisan._id}
              </td>
              <td className="border border-solid  flex justify-center">
                <img src={artisan.avatar} alt="" className="h-16 w-16" />
              </td>
              <td className="border border-solid border-black">
                {artisan.fullName}
              </td>
              <td className="border border-solid border-black">
                {artisan.username}
              </td>
              <td className="border border-solid border-black">
                {artisan.email}
              </td>
              <td className="border border-solid border-black">
                {artisan.phoneNo}
              </td>
              <td className="border border-solid border-black">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-error"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Ban
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">
                      Do You Want To Ban This Artisan
                    </h3>
                    <p className="pt-2">
                      <button
                        className="p-2 rounded-md bg-gray-400 text-white"
                        onClick={() => BanArtisan(artisan._id)}
                      >
                        Confirm
                      </button>
                    </p>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {/* customer count */}
      <div>
        <h1 className="text-4xl text-center font-bold font-serif m-2 ">
          Total user count: {currentusers}
        </h1>
        <h1 className="text-4xl text-center font-bold font-serif m-2 ">
          Total artisans count: {totalArtisans}
        </h1>
        <h1 className="text-4xl text-center font-bold font-serif m-2 ">
          Active artisans count: {currentartisans.length}
        </h1>
      </div>

      {/* discount coupon apply */}
      <div>
        <GetCoupons />
      </div>
      <div>
        <PostCoupon />
      </div>

      {/* Banned artisans */}
      <div className="w-[100vw] flex justify-center text-center">
        <table className="border border-solid border-black">
          <tr className="p-3 border border-solid border-black">
            <th className="w-16 border border-solid border-black uppercase">
              SNO
            </th>
            <th className="w-64 border border-solid border-black uppercase">
              ID
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              Avatar
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              fullName
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              username
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              email
            </th>
            <th className="w-44 border border-solid border-black uppercase">
              phoneNo
            </th>
          </tr>
          {bannedArtisans.map((artisan) => (
            <tr className="p-3 border border-solid border-black">
              <td className="border border-solid border-black">{index++}</td>
              <td className="border border-solid border-black">
                {artisan._id}
              </td>
              <td className="border border-solid  flex justify-center">
                <img src={artisan.avatar} alt="" className="h-16 w-16" />
              </td>
              <td className="border border-solid border-black">
                {artisan.fullName}
              </td>
              <td className="border border-solid border-black">
                {artisan.username}
              </td>
              <td className="border border-solid border-black">
                {artisan.email}
              </td>
              <td className="border border-solid border-black">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-error"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Unban
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">
                      Do You Want To Unban This Artisan
                    </h3>
                    <p className="pt-2">
                      <button
                        className="p-2 rounded-md bg-gray-400 text-white"
                        onClick={() => unBanArtisan(artisan._id)}
                      >
                        Confirm
                      </button>
                    </p>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
