import {useState,useEffect} from 'react'
import axios from 'axios'

const ActivityGen = () => {
    const [selected,setSelected] = useState(false)
    const [courses,setCourses] = useState([])

    useEffect(()=>{
        axios.get("/courses/all")
        .then(res=>{
            // setCourses(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, []);

    const renderData = () => {
        if(!selected){
            return(
                <div>
                    all course data to be rendered here
                </div>
            )
        }else{
            return(
                <div>
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