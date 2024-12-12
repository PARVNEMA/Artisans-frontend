import React from "react";
import ARComponent from "../components/ARComponent/ARComponent.jsx";
import ARModel from "./ModelLoader";

function Test3d() {
  return (
    <div className="w-screen h-screen">
      <ARComponent />
      <ARModel />
    </div>
  );
}

export default Test3d;
