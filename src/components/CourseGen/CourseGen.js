// dummy datapoints for generating a course
// 40.460373, -111.775993
// 40.459141, -111.775734
// 40.460947, -111.774051

import {useState} from 'react'
import axios from 'axios'

const CourseGen = () => {
    const [name,setName] = useState('')
    const [locations,setLocations] = useState(0)

    const testCourse = [3,4,5];

    const deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }

    const distCalc = (lat1,lon1,lat2,lon2) => {
        const R = 6371; //radius of the earth in km
        const dLat = deg2rad(lat2-lat1);
        const dLon = deg2rad(lon2-lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        const d = R*c;
        // console.log(d)
        return d
    }

    const handleCreate = () => {
        let latitudeArr = [];
        let longitudeArr = [];
        for (let i = 0; i<testCourse.length; i++){
            axios.get(`/locations/${testCourse[i]}`)
            .then(res=>{
                // console.log(i)
                // console.log(testCourse[i])
                // console.log(res.data)
                latitudeArr[i] = +res.data.latitude;
                longitudeArr[i] = +res.data.longitude;
            }).catch(err=>console.log(err))
        }
        console.log(latitudeArr)
        console.log(longitudeArr)
        setLocations(testCourse.length)
        // console.log(name,locations)
    }

    return (
        <div>
            <p>Create a new course</p>
            <div>select up to 5 locations and click the button to create a new course</div>
            <input placeholder="Enter Course Name Here" type="text" onChange={e=>setName(e.target.value)}/>
            <button onClick={handleCreate}>Create Course</button>
        </div>
    )
}

export default CourseGen