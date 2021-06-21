import {useState,useEffect} from 'react'
import axios from 'axios'
import './ActivityGen.css'

const ActivityGen = () => {
    const [selected,setSelected] = useState(false)
    const [courses,setCourses] = useState([])
    const [crseLocs,setCrseLocs] = useState([])
    // console.log(selected)

    useEffect(()=>{
        axios.get("/courses")
        .then(res=>{
            setCourses(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, []);

    const renderCourses = () => {
        return(
            courses.map((crse,idx)=>{
                let avg = crse.mean_completion_time;
                if(avg===null){
                    avg = '--';
                }

                const handleCourseClick = () => {
                    axios.get(`/locations/courses/${crse.course_id}`)
                    .then(res=>{
                        // console.log(res.data)
                        setCrseLocs(res.data)
                    }).catch(err=>console.log(err))
                    setSelected(!selected)
                }

                return(
                    <div key={idx}>
                        <button className="courseBtn" onClick={handleCourseClick}><div className="btnDiv numDiv">{idx+1}</div><div className="btnDiv">{crse.course_name}</div><div className="btnDiv">{crse.locations}</div><div className="btnDiv">{avg}</div></button>
                    </div>
                )
            })
        )
    }

    const renderCourseLocs = () => {
        return(
            crseLocs.map((crse,idx)=>{
                return(
                    <div className="locContainer" key={idx}>
                        <p className="courseLoc numDiv">{crse.location_num}</p><p className="courseLoc">{crse.location_name}</p><p className="courseLoc">{crse.latitude}</p><p className="courseLoc">{crse.longitude}</p><p className="courseLoc">{crse.seg_dist}</p>
                    </div>
                )
            })
        )
    }

    const renderData = () => {
        if(!selected){
            return(
                <div className="containerDiv">
                    <div className="tableHeaderDiv"><p className="tableHeader crseLayout numDiv">Number</p><p className="tableHeader crseLayout">Course Name</p><p className="tableHeader crseLayout"># of Geolocations</p><p className="tableHeader crseLayout">Avg Completion Time</p></div>
                    {renderCourses()}
                </div>
            )
        }else{
            return(
                <div className="containerDiv">
                    <div className="flexBtn"><button onClick={()=>setSelected(!selected)}>Go Back</button></div>
                    <div className="tableHeaderDiv"><p className="tableHeader locLayout numDiv">Location</p><p className="tableHeader locLayout">Name</p><p className="tableHeader locLayout">Latitude</p><p className="tableHeader locLayout">Longitude</p><p className="tableHeader locLayout">Distance to Next</p></div>
                    {renderCourseLocs()}
                </div>
            )
        }
    }

    return(
        <div>
            {renderData()}
        </div>
    )
}

export default ActivityGen

//-- INSERT INTO geo_locations (location_name,latitude,longitude)
//-- VALUES ('Cemetery1',40.460373,-111.775993),('Cemetery2',40.459141,-111.775734),('Cemetery3',40.460947,-111.774051);