import React from 'react'
import './UserDash.css'
import { UserContext } from "../../context/UserContext";
import { useContext,useEffect,useState } from 'react';
// import { getUserActivities } from '../../../server/controllers/activityController';
import axios from 'axios';
import {BsChevronCompactDown} from 'react-icons/bs'
import {BsChevronCompactUp} from 'react-icons/bs'

function UserDash() {
    const [courseNums,setCourseNums] = useState([])
    const [usrCrseData,setUsrCrseData] = useState([])
    const [view,setView] = useState(false)
    // const [initialLoad,setInitialLoad] = useState(0)
    const {user} = useContext(UserContext)
    // let allData = useRef([]);
    // console.log(initialLoad)
    // console.log(allData)

    useEffect(() => {
        if(user){ //&& initialLoad === 0
            // const axiosFunc = async () => {
                axios.get(`/user/activities/courses/${user.user_id}`)
                .then(res=>{
                    console.log(res.data)
                    setCourseNums(res.data)
                }).catch(err=>console.log(err))
            // }
            // axiosFunc()
            // await axios.get(`/user/activities/courses/${user.user_id}`)
            // .then(res=>{
            //     console.log(res.data)
            //     setCourseNums(res.data)
            // }).catch(err=>console.log(err))
            //  getUserActivities()
            // setInitialLoad(1)
        }
    }, [user]) //initialLoad,courseNums

    const mapActivitiesOnCourse = () => {
        return(
            usrCrseData.map((act,idx)=>{
                return(
                    <div className="coursesDiv" key={idx}>
                        <p className="titles data">{idx+1}</p>
                        <p className="titles data">{act.activity_date}</p>
                        <p className="titles data">{act.comp_time/1000}</p>
                    </div>
                )
            })
        )
    }

    const renderUserActivities = (crse) =>{
        if(view){
            return(
                <div>
                    <button className="resetDefaults" onClick={()=>setView(!view)}><BsChevronCompactUp className="chevron"/></button>
                    <div className="coursesDiv">
                        <p className="titles">Count</p>
                        <p className="titles">Date</p>
                        <p className="titles">Time (s)</p>  
                    </div>
                    {mapActivitiesOnCourse()}
                </div>   
            )
        }else{
            return(
                <button className="resetDefaults" onClick={()=>changeBool(crse.course_id)}><BsChevronCompactDown className="chevron"/></button>
            )
        }
    }

    const changeBool = (id) => {
        axios.get(`/user/activities/${user.user_id}/${id}`)
        .then(res=>{
            console.log(res.data)
            setUsrCrseData(res.data)
            setView(!view)
        }).catch(err=>{
            console.log(err)
        })
    }

    const mapDistinctCourses = () => {
        return(
            courseNums.map((crse,idx)=>{
                return(
                    <div key={idx}>
                        <div className="coursesDiv">
                            {/* <p>{crse.course_id}</p> */}
                            <p className="courses">Course Name: {crse.course_name}</p>
                            <p className="courses"># of Geolocations: {crse.locations}</p>
                        </div>
                        {renderUserActivities(crse)}
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <div className = "title">
                <h2>{user.username}'s dashboard</h2>
                <div className = "info-box">
            
                    username: {user.username}<br></br>
                    email: {user.email}
                </div>
                <br></br>
                <div className = "completed-courses">
                Your Completed Courses: 

                </div>
                {/* {renderUserActivities()} */}
            </div>
            {mapDistinctCourses()}
        </div>
    )
}

export default UserDash