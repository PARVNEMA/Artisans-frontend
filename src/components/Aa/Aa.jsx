import React, { useState } from 'react'; // Import custom CSS for additional styles
import Login from '../login/Login';
import ArtisansLogin from '../Artisans/artisanslogin/ArtisansLogin';

const Aa = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-blue-900 via-blue-800 to-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <button
            className={`w-1/2 text-center py-2 ${isLogin ? 'bg-blue-700 text-white' : 'text-blue-700'}`}
            onClick={() => setIsLogin(true)}
          >
            User
          </button>
          <button
            className={`w-1/2 text-center py-2 ${!isLogin ? 'bg-blue-700 text-white' : 'text-blue-700'}`}
            onClick={() => setIsLogin(false)}
          >
            Artisans
          </button>
        </div>
        {isLogin ? <Login />: <ArtisansLogin />}
      </div>
    </div>
  );
};

export default Aa;
