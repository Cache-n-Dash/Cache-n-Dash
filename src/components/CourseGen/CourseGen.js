// dummy datapoints for generating a course
// 40.460373, -111.775993
// 40.459141, -111.775734
// 40.460947, -111.774051

import { useState } from 'react' //,useEffect
import axios from 'axios'
import './CourseGen.css'

const CourseGen = (props) => {
  const [name, setName] = useState('Enter Course Name Here')
  const [locations, setLocations] = useState(0)
  const [lat, setLat] = useState([])
  const [lon, setLon] = useState([])
  // const [names,setNames] = useState([])
  // console.log(props.locs)

  // const testCourse = [3,4,5];
  const locArr = props.locs

  // useEffect(()=>{
  //     if(props.locs){
  //         // axios.get()
  //     }
  // },[])

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  const distCalc = (lat1, lon1, lat2, lon2) => {
    const R = 6371 //radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    // console.log(d)
    return d
  }

  const getLatLong = () => {
    let latitudeArr = []
    let longitudeArr = []
    for (let i = 0; i < locArr.length; i++) {
      axios
        .get(`/locations/${locArr[i]}`)
        .then((res) => {
          latitudeArr[i] = +res.data.latitude
          longitudeArr[i] = +res.data.longitude
        })
        .catch((err) => console.log(err))
    }
    return [latitudeArr, longitudeArr]
  }

  const handleLocs = () => {
    const latLon = getLatLong()
    setLat(latLon[0])
    setLon(latLon[1])
    setLocations(locArr.length)
  }

  const handleCreate = async () => {
    const courseName = name
    const numlocs = locations
    let c_id = null
    c_id = await axios.post('/courses/add', { courseName, numlocs })
    const course_id = c_id.data.course_id
    let distArr
    for (let i = 0; i < locations; i++) {
      if (i === locations - 1) {
        distArr = distCalc(lat[i], lon[i], lat[0], lon[0])
      } else {
        distArr = distCalc(lat[i], lon[i], lat[i + 1], lon[i + 1])
      }
      const seg_dist = distArr
      axios.post(`/courses/${course_id}/locations/${locArr[i]}/${i + 1}`, {
        seg_dist,
      })
    }
    props.setCrseMarkers([])
    props.setLocNames([])
    setName('Enter Course Name Here')
    // setNames([])
    // console.log(distArr)
  }

  const renderLocationNames = () => {
    const names = props.names
    // setNames(props.names)
    if (names) {
      return names.map((name, idx) => {
        return <p className="location-name" key={idx}>{name}</p>
      })
    }
  }

  const isDisabled = () => {
    if(locations !== 0 && name !== '' && name !== 'Enter Course Name Here'){
      return false
    }else{
      return true
    }
  }

  return (
    <div>
      <div className="text-overlay">
        <h4 className="course-title">Create a New Course</h4>
        <p className="explanation">
          Select geolocations in the order they will be visited
        </p>
        <input className="course-name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <button className="courseBtn" onClick={handleLocs}>Confirm Locations</button>
          <button className="courseBtn" onClick={handleCreate} disabled={isDisabled()}>Create Course</button>
        </div>
      </div>
      <div className="locs-selected">
        <p className="locations-title">Locations<br/>Selected:</p>
        {renderLocationNames()}
      </div>
    </div>
  )
}

export default CourseGen

//placeholder="Enter Course Name Here"
