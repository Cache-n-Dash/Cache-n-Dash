import React, { useCallback, useContext, useState, useEffect } from "react";
import {
   GoogleMap,
   Marker,
   useJsApiLoader,
   InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from "use-places-autocomplete";
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { UserContext } from "../../context/UserContext";
import LocationGen from "../Location/LocationGen";
import "./Map.css";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
   width: "100vw",
   height: "92vh",
};

// let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

const options = {
  disableDefaultUI: true,
  zoomControl: false,
}

function Map(props) {
  const { user } = useContext(UserContext)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [map, setMap] = React.useState(null)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [toggler, setToggler] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const getMarkers = useCallback(() => {
    axios
      .get('/locations')
      .then((res) => {
        setMarkers(res.data)
      })
      .catch((err) => console.log(err))

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      props.history.push('/auth')
    } else {
      getMarkers()
    }
  }, [getMarkers])

  const showIt = () => {
    setToggler(!toggler)
  }

  const center = {
    lat: latitude,
    lng: longitude,
  }

  const mapRef = React.useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(12)
  }, [])

  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => latitude, lng: () => longitude },
        radius: 200 * 1000,
      },
    })

    return (
      <div className="indexfour">
        <Combobox
          onSelect={async (address) => {
            setValue(address, false)
            clearSuggestions()

            try {
              const results = await getGeocode({ address })
              const { lat, lng } = await getLatLng(results[0])
              panTo({ lat, lng })
            } catch (err) {
              console.log(err)
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            disabled={!ready}
            placeholder="Find a location..."
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    )
  }

  return isLoaded ? (
    <div id="lowerIt">
      {!toggler && user.isadmin && (
        <button className="getPos" onClick={showIt}>
          +
        </button>
      )}
      {toggler && (
        <button className="getPos notToggler" onClick={showIt}>
          x
        </button>
      )}

      <Search panTo={panTo} />

      <GoogleMap
        // ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
        // onBoundsChanged={console.log('HOW DO I GET THE BOUNDS?')}
      >
        {markers.map((marker) => (
          <Marker
            position={{
              lat: Number(marker.latitude),
              lng: Number(marker.longitude),
            }}
            key={marker.location_id}
            onClick={() => {
              setSelected(marker)
              setLatitude(marker.latitude)
              setLongitude(marker.longitude)
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
              setSelected(null)
            }}
          >
            <div className="infoWindow">
              <h4>{selected.location_name}</h4>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {toggler && <LocationGen />}
    </div>
  ) : (
    <></>
  )
}

export default Map
