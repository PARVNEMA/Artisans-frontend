import axios from "axios";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function GstValidation() {
	const backendurl = import.meta.env.VITE_URL;
	// const { artisanId } = useParams();
	const [gstnumber, setgstnumber] = useState("");

	const addGstNumber = useCallback(async () => {
		try {
			const res = await axios.post(
				`${backendurl}/GST/validate`,
				{ gstinNumber: gstnumber },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			toast.success("Gst Number Added successfully");
			console.log(res.data);

			// setIsWishlisted(true);
		} catch (error) {
			console.log("Error", error);
			if (error.response.status === 401) {
				toast.error("Please login first");
			} else if (error.response.status === 400) {
				toast.error(error.message);
			}
		}
	}, [backendurl]);
	return (
		<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				GST Validation
			</h2>
			<div className="mb-4">
				<label
					htmlFor="gstnumber"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					GST Number
				</label>
				<input
					type="text"
					name="gstnumber"
					id="gstnumber"
					placeholder="Enter GST Number"
					value={gstnumber}
					onChange={(e) => setgstnumber(e.target.value)}
					className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
				/>
			</div>
			<button
				onClick={addGstNumber}
				className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-300"
			>
				Add
			</button>
		</div>
	);
}

export default GstValidation;
