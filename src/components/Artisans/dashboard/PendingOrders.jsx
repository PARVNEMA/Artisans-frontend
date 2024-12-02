import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useState,
} from "react";

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
          {artisansmatrices.map((product) => (
            <div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
              <img src={product?.productImage[0]} alt="" className="h-20 w-20 " />
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl uppercase">
                  <b>Title:</b> {product?.productName}
                </h2>
              </div>
              <div className="text-xl">
                <p>
                  <b className="uppercase">Quantity:</b> {product?.quantity}
                </p>
              </div>
              <div className="text-start flex lg:block">
                <p className="text-xl font-bold uppercase">
                  <b className="uppercase">Order Date:</b>{" "}
                </p>
                <div className="text-xl flex justify-center items-center">
                  <p>{product?.orderDate.slice(0,10)}</p>
                </div>
              </div>
              <div className="text-start flex lg:block">
                <p className="text-xl font-bold uppercase">Status: </p>
                <div className="text-xl flex justify-center items-center">
                  {product?.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
