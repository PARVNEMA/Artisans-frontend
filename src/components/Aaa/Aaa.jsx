import React, { useState } from "react"; // Import custom CSS for additional styles
import ArtisansSignup from "../Artisans/artisanssignup/ArtisansSignup";
import SignUp from "../signup/SignUp";

const Aaa = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="flex items-center justify-center min-h-screen ">
			<div className="m-4 p-8 rounded-lg shadow-lg bg-white">
				<div className="flex justify-between">
					<button
						className={`w-1/2 text-center py-2 ${
							isLogin
								? "bg-three text-[#e8f3f5] rounded-3xl bg-[#25372c]"
								: "text-blue-700"
						}`}
						onClick={() => setIsLogin(true)}
					>
						User
					</button>
					<button
						className={`w-1/2 text-center py-2 ${
							!isLogin
								? "bg-three text-[#e8f3f5] rounded-3xl bg-[#25372c]"
								: "text-blue-700 "
						}`}
						onClick={() => setIsLogin(false)}
						
					>
						Artisans
					</button>
				</div>
				{isLogin ? <SignUp /> : <ArtisansSignup />}
			</div>
		</div>
	);
};

export default Aaa;
