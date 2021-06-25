import React from 'react'
import './UserDash.css'
import { UserContext } from "../../context/UserContext";
import { useContext,useEffect,useState,useRef } from 'react';
// import { getUserActivities } from '../../../server/controllers/activityController';
import axios from 'axios';

function UserDash() {
    const [courseNums,setCourseNums] = useState([])
    const [usrCrseData,setUsrCrseData] = useState([])
    const [initialLoad,setInitialLoad] = useState(0)
    const {user} = useContext(UserContext)
    let allData = useRef([]);
    console.log(initialLoad)
    console.log(allData)

    useEffect(() => {
        if(user && initialLoad === 0){
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
            setInitialLoad(1)
        }
        if(user && initialLoad === 1){
            // let allData = [];
            const mappedData = courseNums.map((crse,idx)=>{
                let data = [];
                axios.get(`/user/activities/${user.user_id}/${crse.course_id}`)
                .then(res=>{
                    console.log(res.data)
                    // setUsrCrseData(...usrCrseData,res.data)
                    data = res.data;
                    allData = data;
                }).catch(err=>{
                    console.log(err)
                })
                // console.log(data)
                return(data)
            })
            // allData = [...mappedData]
            console.log(mappedData)
        }
    }, [user,initialLoad,courseNums])

    const renderUserActivities = () =>{
        if(user && courseNums){
            return(
                courseNums.map((crse,idx)=>{
                    // const getActivities = async () => {
                        // const data = await 
                        axios.get(`/user/activities/${user.user_id}/${crse.course_id}`)
                        .then(res=>{
                            console.log(res.data)
                            setUsrCrseData(...usrCrseData,res.data)
                        }).catch(err=>{
                            console.log(err)
                        })
                    // }
                    // if(usrCrseData){
                        return(
                            <div key={idx}>
                                {/* <p>Course Title: {data[0].course_name}</p>
                                <p># of Geolocations: {data[0].locations}</p> */}
                                {/* {getActivities()} */}
                            </div>
                        )
                    // }
                })
            )
        }
    }

    return (
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
    )
}

export default UserDash