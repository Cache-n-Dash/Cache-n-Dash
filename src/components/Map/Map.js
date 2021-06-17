import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { UserContext } from "../../context/UserContext";
import "./Map.css";
import axios from "axios";
// import mapStyles from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
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
  const { user } = useContext(UserContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const getMarkers = useCallback(() => {
    axios
      .get("/locations/1")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getMarkers();
  }, [getMarkers]);

  console.log(markers);
  console.log(user);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  // const onMapClick = useCallback((e) => {
  //   axios
  //     .post("/locations/add", {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //     })
  //     .then(() => {
  //       getMarkers();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      options={options}
      zoom={8}
      onLoad={onLoad}
      // onClick={onMapClick}
    >
      {markers.map((marker) => {
        <Marker
          position={{
            lat: Number(marker.latitude),
            lng: Number(marker.longitude),
          }}
          key={marker.location_id}
          onClick={setSelected(marker)}
        />;
      })}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
