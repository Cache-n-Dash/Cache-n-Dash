// dummy datapoints for generating a course
// 40.460373, -111.775993
// 40.459141, -111.775734
// 40.460947, -111.774051

import {useState} from 'react'
import axios from 'axios'

const CourseGen = () => {
    const [name,setName] = useState('')
    const [locations,setLocations] = useState(0)
    const [lat,setLat] = useState([])
    const [lon,setLon] = useState([])
    // console.log(lat)

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

    const getLatLong = () => {
        let latitudeArr = [];
        let longitudeArr = [];
        for (let i = 0; i<testCourse.length; i++){
            axios.get(`/locations/${testCourse[i]}`)
            .then(res=>{
                latitudeArr[i] = +res.data.latitude;
                longitudeArr[i] = +res.data.longitude;
            }).catch(err=>console.log(err))
        }
        return [latitudeArr,longitudeArr]
    }

    const handleLocs = () => {
        const latLon = getLatLong();
        setLat(latLon[0]);
        setLon(latLon[1]);
        setLocations(testCourse.length)
    }

    const handleCreate = () => {
        let distArr = [];
        for (let i = 0; i<locations; i++){
            if(i === locations-1){
                distArr[i] = distCalc(lat[i],lon[i],lat[0],lon[0])
            }else{
                distArr[i] = distCalc(lat[i],lon[i],lat[i+1],lon[i+1])
            }
        }
        // const distance_final = distArr.pop()
        // const [distance_12,distance_23,distance_34,distance_45] = distArr;
        // const [location_id_1,location_id_2,location_id_3,location_id_4,location_id_5] = testCourse;
        // console.log(distArr)
        // axios needed here to add data to the database.  I may want to update the database tables to make things more efficient
    }

    return (
        <div>
            <p>Create a new course</p>
            <div>select up to 5 locations and click the button to create a new course</div>
            <input placeholder="Enter Course Name Here" type="text" onChange={e=>setName(e.target.value)}/>
            <button onClick={handleLocs}>Confirm Locations</button>
            <button onClick={handleCreate}>Create Course</button>
        </div>
    )
}

export default CourseGen