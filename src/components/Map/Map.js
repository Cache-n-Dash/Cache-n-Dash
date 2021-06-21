import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { UserContext } from "../../context/UserContext";
import LocationGen from "../Location/LocationGen";
import "./Map.css";
import axios from "axios";

const mapContainerStyle = {
  width: "100vw",
  height: "92vh",
};

const center = {
  lat: 37.10828,
  lng: -113.583282,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map() {
  const { user } = useContext(UserContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [toggler, setToggler] = useState(false)

  const getMarkers = useCallback(() => {
    axios
      .get("/locations/all")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMarkers();
  }, [getMarkers]);

  const showIt = () => {
    setToggler(!toggler)
  }

  console.log(markers);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  return isLoaded ? (
    <div id="lowerIt">
      {!toggler && <button className="getPos" onClick={showIt}>+</button>}
      {toggler && <button className="getPos notToggler" onClick={showIt}>x</button>}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <Marker
            position={{
              lat: Number(marker.latitude),
              lng: Number(marker.longitude),
            }}
            key={marker.location_id}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: Number(selected.latitude),
              lng: Number(selected.longitude),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infoWindow">
              <h4>{selected.location_name}</h4>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {toggler && <LocationGen/>}
    </div>
  ) : (
    <></>
  );
}

export default Map;

// const success = (pos) => {
//   const crd = pos.coords;
//   console.log(`Lat: ${crd.latitude}`)
//   console.log(`long: ${crd.longitude}`)
// }

// const getPos = () => {
//   navigator.geolocation.getCurrentPosition(success)
// }

// <button onClick={getPos}>Determine Position</button>
