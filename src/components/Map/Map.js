import React, { useCallback, useContext, useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { UserContext } from '../../context/UserContext'
import LocationGen from '../Location/LocationGen'
import './Map.css'
import axios from 'axios'
import ConditionalRender from '../ConditionalRender/ConditionalRender'
import CourseGen from '../CourseGen/CourseGen'

const libraries = ['places']

// let footHeight = '45px';
// if(window.innerWidth <= 750){
//   footHeight = '100px';
// }else{
//   footHeight = '45px';
// }

// const mapContainerStyle = {
//   width: '100vw',
//   height: `calc(92vh - ${footHeight})`,
// }

// let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

const options = {
  disableDefaultUI: true,
  zoomControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: true,
  // mapTypeControlOptions: {
  //   style: 'DROPDOWN_MENU',
  //   mapTypeIds: ['roadmap','terrain','satellite']
  // }
}

function Map(props) {
  const { user } = useContext(UserContext)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // const [map, setMap] = React.useState(null)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [toggler, setToggler] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [north, setNorth] = useState(null)
  const [west, setWest] = useState(null)
  const [south, setSouth] = useState(null)
  const [east, setEast] = useState(null)
  const [courseBool, setCourseBool] = useState(false)
  const [crseMarkers, setCrseMarkers] = useState([])
  const [locNames, setLocNames] = useState([])
  const [actBool, setActBool] = useState(false)
  // console.log(crseMarkers)

  let footHeight = '45px'
  if (window.innerWidth <= 750) {
    footHeight = '100px'
  } else {
    footHeight = '45px'
  }

  const mapContainerStyle = {
    width: '100vw',
    height: `calc(100vh - ${footHeight} - 60px)`,
  }

  const getMarkers = useCallback(() => {
    axios
      .get('/locations')
      .then((res) => {
        setMarkers(res.data)
      })
      .catch((err) => console.log(err))

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position)
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
  }, [getMarkers,props.history,user])

  const showIt = () => {
    setToggler(!toggler)
  }

  // console.log(markers)

  const center = {
    lat: latitude,
    lng: longitude,
  }

  const mapRef = React.useRef()
  const onMapLoad = useCallback( async (map) => {
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

  const bounds = async () => {
    let ne = mapRef.current.getBounds()?.getNorthEast()
    let sw = mapRef.current.getBounds()?.getSouthWest()
    let centerer = {};
    centerer = mapRef.current.getCenter()
    if (ne && sw) {
      setNorth(ne.lat())
      setSouth(sw.lat())
      setWest(sw.lng())
      setEast(ne.lng())
    }
    // console.log(centerer)
    if(centerer){
      setLatitude(centerer.lat())
      setLongitude(centerer.lng())
    }
  }

  const renderMarkers = () => {
    return markers.map((marker) => {
      if (
        marker.latitude >= south &&
        marker.latitude <= north &&
        marker.longitude >= west &&
        marker.longitude <= east
      ) {
        return (
          <Marker
            position={{
              lat: Number(marker.latitude),
              lng: Number(marker.longitude),
            }}
            key={marker.location_id}
            onClick={() => {
              setSelected(marker)
              if (courseBool) {
                setCrseMarkers([...crseMarkers, marker.location_id])
                setLocNames([...locNames, marker.location_name])
              }
            }}
          />
        )
      }
    })
  }

  const createCourse = () => {
    setCourseBool(!courseBool)
    setCrseMarkers([])
    setLocNames([])
  }

  return isLoaded ? (
    <div id="lowerIt">
      {!toggler && user.isadmin && !courseBool && (
        <div>
          <button className="getPos" onClick={showIt}>
            +
          </button>
          <button className="getPos newCrse" onClick={createCourse}>
            New
            <br />
            Course
          </button>
        </div>
      )}
      {toggler && (
        <button className="getPos notToggler" onClick={showIt}>
          x
        </button>
      )}
      {courseBool && (
        <button className="getPos notToggler courseBool" onClick={createCourse}>
          x
        </button>
      )}
      {!actBool && !courseBool && (
        <button
          className="getPos startAct"
          onClick={() => setActBool(!actBool)}
        >
          Start
        </button>
      )}
      {actBool && (
        <button
          className="getPos startAct notToggler"
          onClick={() => setActBool(!actBool)}
        >
          x
        </button>
      )}

      <ConditionalRender
        bounds={bounds}
        panTo={panTo}
        north={north}
        south={south}
        west={west}
        east={east}
        actBool={actBool}
      />

      <Search panTo={panTo} />

      <GoogleMap
        onIdle={bounds}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
        // mapTypeId={'satellite'}
      >
        {renderMarkers()}
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
      {courseBool && (
        <CourseGen
          locs={crseMarkers}
          names={locNames}
          setCrseMarkers={setCrseMarkers}
          setLocNames={setLocNames}
        />
      )}
    </div>
  ) : (
    <></>
  )
}

export default Map

// const success = (pos) => {
//   const crd = pos.coords;
//   console.log(`Lat: ${crd.latitude}`)
//   console.log(`long: ${crd.longitude}`)
// }

// const getPos = () => {
//   navigator.geolocation.getCurrentPosition(success)
// }

// <button onClick={getPos}>Determine Position</button>

//mapContainerStyle
//setMapHeight
