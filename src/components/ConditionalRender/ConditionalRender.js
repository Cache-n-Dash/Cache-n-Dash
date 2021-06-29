import React, { useEffect, useState, useCallback } from 'react'
import './ConditionalRender.css'
import axios from 'axios'
import ActivityGen from '../Activity/ActivityGen'

function ConditionalRender(props) {
  const [render, setRender] = useState([])
  const [activated, setActivated] = useState(true)
  const [namer, setNamer] = useState('')
  const [selectCourse, setSelectCourse] = useState([])
  const [selected, setSelected] = useState(false)
  // console.log(activated)

  const getNames = useCallback(() => {
    axios
      .get('/locations')
      .then((res) => {
        // console.log("all",res.data)
        setRender(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const getStartLocs = useCallback(() => {
    axios
      .get(`/locations/start/find`)
      .then((res) => {
        // console.log("start",res.data)
        setRender(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (props.actBool) {
      getStartLocs()
    } else {
      getNames()
    }
  }, [props.actBool, getNames, getStartLocs])

  const activator = () => {
    if (activated) {
      setNamer('transitioner')
    } else {
      setNamer('')
    }
  }

  const combiner = () => {
    setActivated(!activated)
    activator()
  }

  const handleClick = (location) => {
    props.panTo({
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    })
    if (props.actBool) {
      setSelectCourse(location.course_id)
      setSelected(!selected)
    }
  }

  const renderList = () => {
    if (selected) {
      if (!activated) {
        return <ActivityGen course={selectCourse} setSelected={setSelected} />
      }
    } else {
      if (!activated) {
        return render.map((location) => {
          if (
            location.latitude <= props.north &&
            location.latitude >= props.south &&
            location.longitude >= props.west &&
            location.longitude <= props.east
          ) {
            return (
              <div className="location-info" key={location.location_id}>
                {location.location_name !== null && (
                  <h4 onClick={() => handleClick(location)}>
                    <span id="locationName">Location: </span>
                    {location.location_name}
                  </h4>
                )}
              </div>
            )
          } else {
            return <div key={location.location_id}></div>
          }
        })
      }
    }
  }

  return (
    <div className={`render ${namer}`}>
      <div className="modifier">
        <div className="clicker" onClick={() => combiner()}></div>
        {renderList()}
        {/* {render.map((location) => {
          if(location.latitude <= props.north && location.latitude >= props.south && location.longitude >= props.west && location.longitude <= props.east){
            return (
              <div className="location-info" key={location.location_id}>
                {location.location_name !== null && (
                  <h4
                    onClick={() =>
                      props.panTo({
                        lat: Number(location.latitude),
                        lng: Number(location.longitude),
                      })
                    }
                  >
                    {location.location_name}
                  </h4>
                )}
              </div>
            )
          }
        })} */}
      </div>
    </div>
  )
}

export default ConditionalRender

//() =>
// props.panTo({
//   lat: Number(location.latitude),
//   lng: Number(location.longitude),
// })
