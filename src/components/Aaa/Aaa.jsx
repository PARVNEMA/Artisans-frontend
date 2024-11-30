import React, { useState } from "react"; // Import custom CSS for additional styles
import ArtisansSignup from "../Artisans/artisanssignup/ArtisansSignup";
import SignUp from "../signup/SignUp";

const Aaa = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
    <div className="flex items-center justify-center p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center items-center">
          <div className="relative w-[70%] bg-three rounded-s-full bg-opacity-30 rounded-e-full">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 transition-all rounded-full duration-700 ${
                isLogin ? "left-0 bg-three" : "left-1/2 bg-three"
              }`}
            ></div>
            <button
              className={`relative w-1/2 text-center py-2 transition-colors duration-500 ${
                isLogin ? "text-one" : "text-three"
              }`}
              onClick={() => setIsLogin(true)}
            >
              User
            </button>
            <button
              className={`relative w-1/2 text-center py-2 transition-colors duration-500 ${
                !isLogin ? "text-one" : "text-three"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Artisans
            </button>
          </div>
        </div>
        {isLogin ? <SignUp /> : <ArtisansSignup />}
      </div>
    </div>
  );
};

export default Aaa;
