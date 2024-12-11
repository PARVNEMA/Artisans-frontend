import React, { useState } from "react";

const GeolocationComponent = () => {
  const [locationData, setLocationData] = useState({
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [error, setError] = useState(null);

  // Function to get the location
  const getLocation = () => {
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Function to display the location (latitude, longitude)
  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log("Latitude:", lat, "Longitude:", lon);

    // Call reverse geocoding to get city, state, district, etc.
    reverseGeocode(lat, lon);
  };

  // Function to handle errors
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  // Function to reverse geocode the latitude and longitude using OpenStreetMap's Nominatim API
  const reverseGeocode = (lat, lon) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Reverse Geocoding Data:", data);
        const address = data.address;

        const city = address.city || "";
        const district = address.district || "";
        const state = address.state || "";
        const country = address.country || "";

        // Store the values in state variables
        setLocationData({
          city,
          district,
          state,
          country,
        });
      })
      .catch((error) => {
        console.error("Error fetching location details:", error);
        setError("Error fetching location details.");
      });
  };

  return (
    <div>
      <h1>Get Your Location</h1>
      <button onClick={getLocation}>Get Location</button>

      {locationData.city && <p>City: {locationData.city}</p>}
      {locationData.district && <p>District: {locationData.district}</p>}
      {locationData.state && <p>State: {locationData.state}</p>}
      {locationData.country && <p>Country: {locationData.country}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GeolocationComponent;
