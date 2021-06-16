import React, { useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./Map.css";
// import mapStyles from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
    width: "100vw",
    height: "99vh",
  };

const center = {
  lat: 37,
  lng: -100,
};

const options = {
  zoomControl: true,
  disableDefaultUI: true,
//   styles: mapStyles
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      options={options}
      zoom={8}
      onLoad={onLoad}
    >
      <></>
    </GoogleMap>
) : <></>
}

export default Map;
