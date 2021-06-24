import React, { useEffect, useState, useCallback } from 'react'
import './ConditionalRender.css'
import axios from 'axios'

function ConditionalRender(props) {
  const [render, setRender] = useState([])
  const [activated, setActivated] = useState(false)
  const [namer, setNamer] = useState('')

  const getNames = useCallback(() => {
    axios
      .get('/locations')
      .then((res) => {
        setRender(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    getNames()
  }, [getNames])

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

  return (
    <div className={`render ${namer}`}>
      <div className="clicker" onClick={() => combiner()}></div>
      {render.map((location) => {
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
      })}
    </div>
  )
}

export default ConditionalRender
