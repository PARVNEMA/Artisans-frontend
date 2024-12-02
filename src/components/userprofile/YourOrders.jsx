import axios from "axios";
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "react-toastify";
import { CurrencyContext } from "../../../useContext/CurrencyContext";

function YourOrders() {
  const {currency} = useContext(CurrencyContext);
	const backendurl = import.meta.env.VITE_URL;
	const [orderProducts, setorderProducts] = useState([]);
	const showBill = useCallback(async () => {
		try {
			const res = await axios.get(`${backendurl}/order`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			console.log("get current order Items", res.data);
			setorderProducts(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	const cancelProductOrder = useCallback(
		async (orderId, orderItemId) => {
			console.log("orderId", orderId);
			console.log("orderItemId", orderItemId);

			try {
				const res = await axios.delete(
					`${backendurl}/order/cancel-order/${orderId}/${orderItemId}`,
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"accessToken"
							)}`,
						},
					}
				);
				console.log("product order cancelled", res.data);
				toast.success("product order cancelled");
				showBill();
			} catch (error) {
				console.log("Error", error);
				toast.error(error.message);
			}
		},
		[]
	);
	useEffect(() => {
		showBill();
	}, []);
	return (
    <div className="mx-10">
      <div className="w-[85%] pl-[8rem]">
        <h1 className="text-5xl font-extrabold uppercase text-three text-center mt-10 mb-3">
          Your Orders
        </h1>
      </div>
      {orderProducts?.map((item, index) => (
        <div className="my-5">
          <div>
            {/* individual items in each order */}
            <div className="bg-white p-2 rounded-lg">
              {item?.items?.map((prod) => (
                <div>
                  {/* <h1>{prod?.productId?.title}</h1> */}
                  <div className="flex justify-between items-center p-4 border rounded-lg m-2 flex-col lg:flex-row bg-four bg-opacity-45">
                    <img
                      src={prod?.productId?.images[0]}
                      alt=""
                      className="h-20 w-20 "
                    />
                    <div className="flex flex-col justify-between">
                      <h2 className="text-2xl uppercase">
                        <b>Title:</b> {prod?.productId?.title}
                      </h2>
                    </div>
                    <p className="text-xl">
                      <b className="uppercase">Description:</b>{" "}
                      {prod?.productId?.description}
                    </p>

                    <div className="text-start flex lg:block">
                      <p className="text-xl font-bold uppercase">Price:</p>
                      <div className="text-xl flex justify-center items-center">
                        {currency === "INR"
                          ? "₹"
                          : currency === "USD"
                          ? "$"
                          : "€ "}{" "}
                        {prod?.productId?.price}
                      </div>
                    </div>
                    <div className="text-start flex lg:block">
                      <p className="text-xl font-bold uppercase">status: </p>
                      <div className="text-xl flex justify-center items-center">
                        {prod?.status}
                      </div>
                    </div>
                    <button
                      className={`btn btn-error ${
                        prod?.status === "Pending" ? "block" : "hidden"
                      }`}
                      onClick={() =>
                        cancelProductOrder(item._id, prod.orderItemId)
                      }
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-xl flex justify-between font-bold m-5">
                <div>Order Date : {item?.orderDate?.slice(0, 10)}</div>
                <div>
                  <h1>
                    Total Order Price :{" "}
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€ "}{" "}
                    {item?.totalPrice}
                  </h1>
                  <h1>
                    Shipping Charges :{" "}
                    {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€ "}{" "}
                    {item?.shippingCharges}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-3 border-three mt-6"></div>
        </div>
      ))}
    </div>
  );
}

export default YourOrders;
