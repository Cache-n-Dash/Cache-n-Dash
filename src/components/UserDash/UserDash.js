import React from 'react'
import './UserDash.css'
import { UserContext } from "../../context/UserContext";
import { useContext,useEffect,useState } from 'react';
// import { getUserActivities } from '../../../server/controllers/activityController';
import axios from 'axios';

function UserDash() {
    const [courseNums,setCourseNums] = useState([])
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user){
            axios.get(`/user/activities/courses/${user.user_id}`)
            .then(res=>{
                console.log(res.data)
                setCourseNums(res.data)
            }).catch(err=>console.log(err))
            //  getUserActivities()
        }
    }, [])

//  const getUserActivities = () => {
//      axios.get(`/user/activities/${user_id}/${course_id}`)
//      .then(res => )
//  }

    const renderUserActivities = () =>{
        if(user){
            return(
                courseNums.map((crse,idx)=>{
                    // const getActivities = () => {
                        axios.get(`/user/activities/${user.user_id}/${crse.course_id}`)
                        .then(res=>{
                            console.log(res.data)
                        }).catch(err=>{
                            console.log(err)
                        })
                    // }

                    return(
                        <div key={idx}>
                            test
                        </div>
                    )
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
            {renderUserActivities()}
        </div>
    )
}

export default UserDash

// import React from 'react'
// import './UserDash.css'
// import { UserContext } from "../../context/UserContext";
// import { useContext,useEffect,useState } from 'react';
// // import { getUserActivities } from '../../../server/controllers/activityController';
// import axios from 'axios';

// function UserDash() {
// const [courseNums,setCourseNums] = useState([])
// const {user} = useContext(UserContext)

// useEffect(() => {
//     if(user){
//         axios.get(`/user/activities/courses/${user.user_id}`)
//         .then(res=>{
//             console.log(res.data)
//             setCourseNums(res.data)
//         }).catch(err=>console.log(err))
//         //  getUserActivities()
//     }
// }, []) 

// //  const getUserActivities = () => {
// //      axios.get(`/user/activities/${user_id}/${course_id}`)
// //      .then(res => )
// //  }
   
//     return (
//         <div className = "title">
//             <h2>{user.username}'s dashboard</h2>
//             <div className = "info-box">
            
//             username: {user.username}<br></br>
//             email: {user.email}
//             </div>
//             <br></br>
//             <div className = "completed-courses">
//             Your Completed Courses: 

//             </div>
            
//         </div>
//     )
// }

// export default UserDash