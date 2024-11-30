import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";

function GetCoupons() {
	const backendurl = import.meta.env.VITE_URL;
	const [coupons, setcoupons] = useState([]);

	const getAllCoupons = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/admin/nastrigo/Coupans`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"adminaccessToken"
						)}`,
					},
				}
			);
			console.log("current coupons = ", res.data.data);
			setcoupons(res.data.data);
		} catch (error) {
			console.log("Error", error);
			toast.error(error.message);
		}
	}, []);

	useEffect(() => {
		getAllCoupons();
	}, []);

	return (
		<div>
			<table className="border border-solid border-black">
				<tr className="p-3 border border-solid border-black">
					<th className="w-16 border border-solid border-black uppercase">
						SNO
					</th>
					<th className="w-64 border border-solid border-black uppercase">
						Code
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						discountType
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						DiscountValue
					</th>

					<th className="w-44 border border-solid border-black uppercase">
						isActive
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						maxDiscount
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						minPurchase
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						valideFrom
					</th>
					<th className="w-44 border border-solid border-black uppercase">
						validTill
					</th>
				</tr>
				{coupons.map((coupon, index) => (
					<tr className="p-3 border border-solid border-black">
						<td className="border border-solid border-black">
							{index++}
						</td>
						<td className="border border-solid border-black">
							{coupon.code}
						</td>
						<td className="border border-solid  flex justify-center">
							{coupon.discountType}
						</td>
						<td className="border border-solid border-black">
							{coupon.discountValue}
						</td>
						<td className="border border-solid border-black">
							{coupon.isActive ? "true" : "false"}
						</td>
						<td className="border border-solid border-black">
							{coupon.maxDiscount}
						</td>
						<td className="border border-solid border-black">
							{coupon.minPurchase}
						</td>
						<td className="border border-solid border-black">
							{coupon.validFrom.slice(0, 10)}
						</td>
						<td className="border border-solid border-black">
							{coupon.validTill.slice(0, 10)}
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}

export default GetCoupons;
