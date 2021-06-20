import {useState,useEffect} from 'react'
import axios from 'axios'

const ActivityGen = () => {
    const [selected,setSelected] = useState(false)
    const [courses,setCourses] = useState([])
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
                        console.log(res.data)
                    }).catch(err=>console.log(err))
                    setSelected(!selected)
                }

                return(
                    <div key={idx}>
                        <button onClick={handleCourseClick}>{crse.course_name} | {crse.locations} | {avg}</button>
                    </div>
                )
            })
        )
    }

    const renderData = () => {
        if(!selected){
            return(
                <div>
                    <p>Course Name | # of Geolocations | Average Completion Time</p>
                    {renderCourses()}
                </div>
            )
        }else{
            return(
                <div>
                    <button onClick={()=>setSelected(!selected)}>Go Back</button>
                    detailed course data to be rendered here for a single course
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