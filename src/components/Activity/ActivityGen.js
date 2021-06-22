import {useState,useEffect,useContext} from 'react'
import { UserContext } from "../../context/UserContext";
import axios from 'axios'
import './ActivityGen.css'

const ActivityGen = () => {
    const [selected,setSelected] = useState(false)
    const [doAct,setDoAct] = useState(false)
    const [courses,setCourses] = useState([])
    const [crseLocs,setCrseLocs] = useState([])
    const [oneCourse,setOneCourse] = useState({})
    const [actID,setActID] = useState(null)
    const {user} = useContext(UserContext)
    const [currLoc,setCurrLoc] = useState(1)
    // console.log(selected)

    useEffect(()=>{
        axios.get("/courses")
        .then(res=>{
            setCourses(res.data)
            // console.log(res.data)
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
                        setOneCourse(crse)
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

    const verifyLoc = (crse) => {
        const cloc_id = crse.cloc_id;
        const timestamp = Date.now();
        let startEnd = '';
        if(currLoc === 1){
            startEnd = 'START';
        }else if(currLoc <= oneCourse.locations){
            startEnd = 'MIDDLE';
        }
        axios.post(`/activity/update/${actID}/${cloc_id}`,{timestamp,startEnd})
        .then(res=>{
            console.log(res)
        }).catch(err=>console.log(err))
        setCurrLoc(currLoc+1)
    }

    const renderCourseLocs = () => {
        // let currLoc = 1;
        return(
            crseLocs.map((crse,idx)=>{
                if(!doAct || crse.location_num !== currLoc){
                    return(
                        <div className="locContainer" key={idx}>
                            <p className="courseLoc numDiv">{crse.location_num}</p><p className="courseLoc">{crse.location_name}</p><p className="courseLoc">{crse.latitude}</p><p className="courseLoc">{crse.longitude}</p><p className="courseLoc">{crse.seg_dist}</p>
                        </div>
                    )
                }else if(doAct && crse.location_num === currLoc){
                    return(
                        <div key={idx}>
                            <div className="locContainer">
                                <p className="courseLoc numDiv">{crse.location_num}</p><p className="courseLoc">{crse.location_name}</p><p className="courseLoc">{crse.latitude}</p><p className="courseLoc">{crse.longitude}</p><p className="courseLoc">{crse.seg_dist}</p>
                            </div>
                            <button onClick={()=>verifyLoc(crse)}>Verify Location</button>
                        </div>
                    )
                }
            })
        )
    }

    const selectCourse = () => {
        if(user){
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDate();
            const date = `${year}-${month}-${day}`;
            // console.log(date)
            axios.post(`/activity/start/${oneCourse.course_id}/${user.user_id}`,{date})
            .then(res=>{
                // console.log(res.data)
                const activity_id = res.data[0]
                setActID(activity_id.activity_id)
                setDoAct(!doAct)
            }).catch(err=>{
                console.log(err)
            })
        }else{
            alert("You must be logged in to continue")
        }
    }

    const renderData = () => {
        if(doAct){
            return(
                <div className="containerDiv">
                    <div className="flexBtn"><button onClick={()=>setDoAct(!doAct)}>Go Back</button></div>
                    <h4>{oneCourse.course_name}</h4>
                    <div className="tableHeaderDiv"><p className="tableHeader locLayout numDiv">Location</p><p className="tableHeader locLayout">Name</p><p className="tableHeader locLayout">Latitude</p><p className="tableHeader locLayout">Longitude</p><p className="tableHeader locLayout">Distance to Next (km)</p></div>
                    {renderCourseLocs()}
                    {/* <button onClick={}></button> */}
                </div>
            )
        }else{
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
                        <h4>{oneCourse.course_name}</h4>
                        <div className="tableHeaderDiv"><p className="tableHeader locLayout numDiv">Location</p><p className="tableHeader locLayout">Name</p><p className="tableHeader locLayout">Latitude</p><p className="tableHeader locLayout">Longitude</p><p className="tableHeader locLayout">Distance to Next (km)</p></div>
                        {renderCourseLocs()}
                        <button onClick={selectCourse}>Select Course</button>
                    </div>
                )
            }
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