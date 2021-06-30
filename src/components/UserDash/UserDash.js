import React from "react";
import "./UserDash.css";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
// import { getUserActivities } from '../../../server/controllers/activityController';
import axios from "axios";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronCompactUp } from "react-icons/bs";
import { Parallax } from "react-parallax";

function UserDash() {
   const img1 =
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80";
   const [courseNums, setCourseNums] = useState([]);
   const [usrCrseData, setUsrCrseData] = useState([]);
   const [view, setView] = useState(false);
   // const [initialLoad,setInitialLoad] = useState(0)
   const { user } = useContext(UserContext);
   // let allData = useRef([]);
   // console.log(initialLoad)
   // console.log(allData)

   useEffect(() => {
      if (user) {
         //&& initialLoad === 0
         // const axiosFunc = async () => {
         axios
            .get(`/user/activities/courses/${user.user_id}`)
            .then((res) => {
               // console.log(res.data)
               setCourseNums(res.data);
            })
            .catch((err) => console.log(err));
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
   }, [user]); //initialLoad,courseNums

   const mapActivitiesOnCourse = () => {
      return usrCrseData.map((act, idx) => {
         return (
            <div
               className={
                  (idx + 1) % 2 === 0 ? "coursesDiv" : "coursesDiv colorChange"
               }
               key={idx}
            >
               <p className="titles data">{idx + 1}</p>
               <div className="brk-ln" />
               <p className="titles data">{act.activity_date}</p>
               <div className="brk-ln" />
               <p className="titles data">{act.comp_time / 1000}</p>
            </div>
         );
      });
   };

   const renderUserActivities = (crse) => {
      if (view && crse.course_id === usrCrseData[0].course_id) {
         return (
            <div className="center">
               <button className="resetDefaults" onClick={() => setView(false)}>
                  <BsChevronCompactUp className="chevron" />
               </button>
               <div className="coursesDiv">
                  <p className="titles">Count</p>
                  <div className="brk-ln" />

                  <p className="titles">Date</p>
                  <div className="brk-ln" />

                  <p className="titles">Time (s)</p>
               </div>
               <div className="new-line" />
               {mapActivitiesOnCourse()}
               <div className="new-line" />
            </div>
         );
      } else {
         return (
            <button
               className="resetDefaults"
               onClick={() => changeBool(crse.course_id)}
            >
               <BsChevronCompactDown className="chevron" />
            </button>
         );
      }
   };

   const changeBool = (id) => {
      axios
         .get(`/user/activities/${user.user_id}/${id}`)
         .then((res) => {
            // console.log(res.data)
            setUsrCrseData(res.data);
            setView(true);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const mapDistinctCourses = () => {
      return courseNums.map((crse, idx) => {
         return (
            <div className="center" key={idx}>
               <div className="coursesDiv">
                  {/* <p>{crse.course_id}</p> */}
                  <p className="courses">{crse.course_name}</p>
               </div>
               {renderUserActivities(crse)}
            </div>
         );
      });
   };

   return (
      <div className="dashboard">
         <div className="title">
            <Parallax
               className="para-user center"
               bgImage={img1}
               strength={400}
               blur={3}
            >
               <div className="info-box">
                  <h1>{user.username}'s dashboard</h1>
                  <div className="line" />

                  <div>username: {user.username}</div>
                  <div>email: {user.email}</div>
                  {user.isAdmin ? <div /> : <div>Admin</div>}
               </div>
               <br></br>
            </Parallax>
            <div className="completed-courses">
               <h2>Your Completed Courses:</h2>
            </div>
            {/* {renderUserActivities()} */}
         </div>
         {mapDistinctCourses()}
      </div>
   );
}

export default UserDash;
