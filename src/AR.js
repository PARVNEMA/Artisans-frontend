<a-scene embedded arjs>
  {/* <!-- AR marker (you can use a preset like 'hiro' or use a custom marker) --> */}
  <a-marker preset="hiro">
    <a-entity
      obj-model="obj: url(../../../../k.obj);"
      scale="0.00 0.00 0.00"
      position="0 0 0"
    ></a-entity>
  </a-marker>

  {/* <!-- Camera for the AR scene --> */}
  <a-entity camera></a-entity>
</a-scene>;
