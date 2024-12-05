import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";

function PendingOrders() {
	const [artisansmatrices, setArtisansMatrices] = useState(
		[]
	);

	const backendurl = import.meta.env.VITE_URL;
	const getArtisansSellerMetrices =
		useCallback(async () => {
			try {
				const res = await axios.get(
					`${backendurl}/artisans/dashboard`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log(
					"current artisans metrices in pending order=",
					res.data.data.orderRequests
				);
				setArtisansMatrices(res.data.data.orderRequests);
			} catch (error) {
				console.error("error in dashboard ", error);
			}
		}, []);
	const CancelOrderItem = useCallback(
		async (orderId, orderItemId) => {
			try {
				const res = await axios.post(
					`${backendurl}/artisans/cancel-order/${orderId}/${orderItemId}`,
					null,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"artisansaccessToken"
							)}`,
						},
					}
				);
				console.log(
					"Order Cancelled in pending order=",
					res.data
				);
				toast.success("Order cancelled successfully");
				getArtisansSellerMetrices();
			} catch (error) {
				console.error("error in dashboard ", error);
			}
		},
		[]
	);

	useEffect(() => {
		getArtisansSellerMetrices();
	}, []);

	return (
    <div>
      {/* {artisansmatrices?.map((item, index) => (
				<div>
					<h1>Total Order Price=₹{item?.totalPrice}</h1>
					<h1>Shipping Charges={item?.shippingCharges}</h1>
					<h1>Order Status={item?.orderStatus}</h1>
				</div>
			))} */}
      <div>
        <div className="flex items-center w-full">
          <div className="w-[85%] pl-[8rem]">
            <h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
              Pending Orders
            </h1>
          </div>
        </div>

        {/* Order */}
        <div className="mx-[10rem]">
          {" "}
          <div className="overflow-x-auto mb-12">
            {" "}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              {" "}
              <thead className="bg-four text-white">
                {" "}
                <tr>
                  {" "}
                  <th className="py-3 px-6 font-semibold uppercase">
                    SNO
                  </th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">Image</th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">Title</th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">
                    Quantity
                  </th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">
                    Order Date
                  </th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">Status</th>{" "}
                  <th className="py-3 px-6 font-semibold uppercase">Action</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {artisansmatrices.map((product, i) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b hover:bg-gray-100 transition-all"
                  >
                    {" "}
                    <td className="py-3 px-6 text-center border">
                      {i + 1}.
                    </td>{" "}
                    <td className="py-3 px-6 text-center border flex justify-center">
                      {" "}
                      <img
                        src={product?.productImage[0]}
                        alt={product?.productName}
                        className="h-16 w-16 object-fill rounded-full"
                      />{" "}
                    </td>{" "}
                    <td className="py-3 px-6 text-center border">
                      {product?.productName}
                    </td>{" "}
                    <td className="py-3 px-6 text-center border">
                      {product?.quantity}
                    </td>{" "}
                    <td className="py-3 px-6 text-center border">
                      {product?.orderDate.slice(0, 10)}
                    </td>{" "}
                    <td className="py-3 px-6 text-center border">
                      {product?.status}
                    </td>{" "}
                    <td className="py-3 px-6 text-center border">
                      {" "}
                      <button
                        className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                        onClick={() =>
                          CancelOrderItem(product?.orderId, product?.productId)
                        }
                      >
                        {" "}
                        Cancel Order{" "}
                      </button>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
