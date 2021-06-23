import { useState } from 'react'
import axios from 'axios'
import './LocationGen.css'

const LocationGen = () => {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [locBool, setLocBool] = useState(false)
  const [name, setName] = useState('')

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  }

  const success = (pos) => {
    const crd = pos.coords
    //   console.log(`Lat: ${crd.latitude}`)
    setLat(crd.latitude)
    //   console.log(`long: ${crd.longitude}`)
    setLon(crd.longitude)
    setLocBool(true)
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const getPos = () => {
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  const handleCancel = () => {
    setLat(null)
    setLon(null)
    setLocBool(false)
    setName('')
  }

  const handleSubmit = async () => {
    const locationName = name
    const latitude = lat
    const longitude = lon
    await axios.post('/locations/add', { locationName, latitude, longitude })
    handleCancel()
  }

  const renderLoc = () => {
    if (locBool) {
      return (
        <div className="geoLocator">
          <p>You are currently at</p>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lon}</p>
          <p>What is the name of this geocache?</p>
          <input
            placeholder="enter name here"
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit} id="submitter">
              Submit
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="locationAdder">
          <p>Click on the button to create a new geocache location</p>
          <button id="locationAdderBtn" onClick={getPos}>
            Create
          </button>
        </div>
      )
    }
  }

  return <div className="newLoc">{renderLoc()}</div>
}

export default LocationGen
