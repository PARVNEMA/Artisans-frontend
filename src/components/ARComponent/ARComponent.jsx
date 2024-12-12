import React from "react";

const ARComponent = () => {
  return (
    <div className="">
      {/* AR.js Scene */}
      <a-scene embedded arjs>
        {/* AR Marker */}
        <div className="flex">
          <div>
            <a-marker preset="hiro">
              <a-entity
                obj-model="obj: url(../../../../k.obj)"
                scale="0.2 0.2 0.2"
                position="0 0 0"
              ></a-entity>
            </a-marker>
          </div>
          {/* Camera */}
          <div className="bg-red">
            <a-entity camera></a-entity>
          </div>
        </div>
      </a-scene>
    </div>
  );
};

export default ARComponent;
