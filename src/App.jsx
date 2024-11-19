import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="flex flex-col ">
      <div className="bg-one text-four">
        <Navbar />
      </div>
      <main className="bg-three text-white">
        <Outlet />
      </main>
      <div className="bg-one text-five">
        <Footer />
      </div>
    </div>
  );
}

export default App;
