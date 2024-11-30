import React, { useState } from "react"; // Import custom CSS for additional styles
import Login from "../login/Login";
import ArtisansLogin from "../Artisans/artisanslogin/ArtisansLogin";

const Aa = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="flex items-center justify-center p-3 ">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<div className="flex justify-between">
					<button
						className={`w-1/2 text-center py-2 ${
							isLogin
								? "text-one rounded-3xl bg-three"
								: "text-three"
						}`}
						onClick={() => setIsLogin(true)}
					>
						User
					</button>
					<button
						className={`w-1/2 text-center py-2 ${
							!isLogin
								? " text-one rounded-3xl bg-three"
								: "text-three"
						}`}
						onClick={() => setIsLogin(false)}
					>
						Artisans
					</button>
				</div>
				{isLogin ? <Login /> : <ArtisansLogin />}
			</div>
		</div>
	);
};

export default Aa;
