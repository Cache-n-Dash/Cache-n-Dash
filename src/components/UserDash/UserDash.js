import React from 'react'
import './UserDash.css'
import { UserContext } from "../../context/UserContext";
import { useContext,useEffect,useState } from 'react';
// import { getUserActivities } from '../../../server/controllers/activityController';
import axios from 'axios';

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
        // if(user && initialLoad === 1){
        //     // let allData = [];
        //     const mappedData = courseNums.map((crse,idx)=>{
        //         let data = [];
        //         axios.get(`/user/activities/${user.user_id}/${crse.course_id}`)
        //         .then(res=>{
        //             console.log(res.data)
        //             // setUsrCrseData(...usrCrseData,res.data)
        //             data = res.data;
        //             allData = data;
        //         }).catch(err=>{
        //             console.log(err)
        //         })
        //         // console.log(data)
        //         return(data)
        //     })
        //     // allData = [...mappedData]
        //     console.log(mappedData)
        // }
    }, [user]) //initialLoad,courseNums

    const mapActivitiesOnCourse = () => {
        return(
            usrCrseData.map((act,idx)=>{
                return(
                    <div key={idx}>
                        <p>{idx+1}</p>
                        <p>{act.activity_date}</p>
                        <p>{act.comp_time/1000}</p>
                    </div>
                )
            })
        )
    }

    const renderUserActivities = (crse) =>{
        if(view){
            return(
                <div>
                    <button onClick={()=>setView(!view)}>Back</button>
                    <div>
                        <p>Count</p>
                        <p>Date</p>
                        <p>Completion Time (s)</p>  
                    </div>
                    {mapActivitiesOnCourse()}
                </div>   
            )
        }else{
            return(
                <button onClick={()=>changeBool(crse.course_id)}>See All</button>
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
                        {/* <p>{crse.course_id}</p> */}
                        <p>Course Name: {crse.course_name}</p>
                        <p># of Geolocations: {crse.locations}</p>
                        {/* <button onClick={()=>changeBool(crse.course_id)}>See All</button> */}
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