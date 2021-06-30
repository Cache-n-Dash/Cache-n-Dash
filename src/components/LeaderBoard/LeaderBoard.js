import React from "react";
import { useState, useEffect } from "react";
import "./LeaderBoard.css";
import axios from "axios";
import Courses from "../Courses/Courses";
// import { IoCaretForwardSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
// import {IoArrowForwardCircleSharp} from 'react-icons/io5'
// import { IoArrowForwardSharp } from "react-icons/io5";
// import {IoArrowBackSharp} from 'react-icons/io5'
// import { IoArrowUndoSharp } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function LeaderBoard() {
   const [course, setCourse] = useState({});
   const [courseID, setCourseID] = useState(null);
   const [courseLeaders, setCourseLeaders] = useState([]);
   const [openID, setOpenID] = useState(null);
   const [actLocs, setActLocs] = useState([]);
   const [viewSegLdrs, setViewSegLdrs] = useState(false);
   const [segLeaders, setSegLeaders] = useState([]);
   const [resetCourses, setResetCourses] = useState(false);
   const ldrBool = "TRUE";
   const location = useLocation();
   let finishActCrseID;
   if (location.state) {
      finishActCrseID = location.state.finishActCrseID;
      // console.log(location.state)
   }
   // const [segmentLocs,setSegmentLocs] = useState([])

   useEffect(() => {
      if (courseID) {
         axios
            .get(`/courses/${courseID}`)
            .then((res) => {
               setCourse(res.data[0]);
               // console.log(res.data[0])
            })
            .catch((err) => console.log(err));
         axios
            .get(`/leaderboard/${courseID}`)
            .then((res) => {
               setCourseLeaders(res.data);
               // console.log(res.data)
            })
            .catch((err) => console.log(err));
         setResetCourses(false);
      } else if (finishActCrseID && resetCourses === false) {
         setCourseID(finishActCrseID);
      }
   }, [courseID,finishActCrseID,resetCourses]);

   const handleClick = (id) => {
      if (openID === id) {
         setOpenID(null);
         setActLocs([]);
      } else {
         setOpenID(id);
         axios
            .get(`/activity/locations/${id}`)
            .then((res) => {
               // console.log(res.data)
               setActLocs(res.data);
            })
            .catch((err) => console.log(err));
      }
   };

   const renderCaret = (id) => {
      if (openID === id) {
         return (
            <div>
               <IoClose className="close-btn" />
               <p className="close-txt">close</p>
            </div>
         );
      } else {
         return <IoChevronForward className="arrow-btn" />;
      }
   };

   const handleSwitch = async (id) => {
      // async
      try {
         const cLoc = await axios.get(`/courses/locations/${id}`);
         const cl = cLoc.data[0];
         // console.log(cl)

         const segLdrs = await axios.get(
            `/leaderboard/${cl.location_id}/${cl.course_id}`
         );
         const sl = segLdrs.data;
         // console.log(sl)

         setSegLeaders(sl);
         setViewSegLdrs(!viewSegLdrs);
      } catch (error) {
         console.log(error);
      }
   };

   const handleActivityLocs = (ldr) => {
      if (openID === ldr.activity_id && actLocs) {
         return actLocs.map((seg, idx) => {
            const renderLocNum = () => {
               if (idx === course.locations) {
                  return <p className="ldrList">Location Number: {1}</p>;
               } else {
                  return <p className="ldrList">Location Number: {idx + 1}</p>;
               }
            };

            const renderSegTime = () => {
               if (idx === 0) {
                  return <p className="ldrList">{seg.start_end}</p>;
               } else {
                  return (
                     <p className="ldrList">
                        Segment Time: {seg.seg_time / 1000} s
                     </p>
                  );
               }
            };

            const renderSegLdrBtn = () => {
               if (idx !== 0) {
                  return (
                     <button
                        className="removeDefaults"
                        onClick={() => handleSwitch(seg.cloc_id)}
                     >
                        <IoChevronForward className="forward-button" />
                        <p className="to-seg-txt"> Segment leaderboard</p>
                     </button>
                  );
               } else {
                  return <div className="empty-space"></div>;
               }
            };

            return (
               <div>
                  <div className="new-line-seg" />
                  <div
                     className={
                        (idx + 1) % 2 === 0
                           ? "ldrItem colorBg"
                           : "ldrItem colorPurple"
                     }
                     key={idx}
                  >
                     {/* <p className="ldrList">Location Number: {idx+1}</p> */}
                     {renderLocNum()}
                     <div className="brk-ln" />
                     {/* <p className="ldrList">Segment Time: {seg.seg_time}</p> */}
                     {renderSegTime()}
                     {renderSegLdrBtn()}
                  </div>
               </div>
            );
         });
      }
   };

   const renderLeaderBoard = () => {
      return courseLeaders.map((ldr, idx) => {
         return (
            <div
               className={
                  (idx + 1) % 2 === 0 ? "ldr-div" : "ldr-div colorChange"
               }
               key={idx}
            >
               <div className="ldrItem">
                  <p className="ldrList">{ldr.username}</p>
                  <div className="brk-ln  " />
                  <p className="ldrList">{ldr.activity_date}</p>
                  <div className="brk-ln " />
                  <p className="ldrList">{ldr.comp_time / 1000}</p>
                  <button
                     className="removeDefaults"
                     onClick={() => handleClick(ldr.activity_id)}
                  >
                     {renderCaret(ldr.activity_id)}
                  </button>
               </div>
               {handleActivityLocs(ldr)}
               <div className="new-line" />
            </div>
         );
      });
   };

   const renderSegLeaderBoard = () => {
      return segLeaders.map((ldr, idx) => {
         return (
            <div>
               <div
                  className={
                     (idx + 1) % 2 === 0
                        ? "ldrItem-seg"
                        : "ldrItem-seg colorChange"
                  }
                  key={idx}
               >
                  <p className="segList">{ldr.username}</p>
                  <div className="brk-ln " />
                  <p className="segList">{ldr.activity_date}</p>
                  <div className="brk-ln " />
                  <p className="segList">{ldr.seg_dist}</p>
                  <div className="brk-ln " />
                  <p className="segList">{ldr.seg_time / 1000}</p>
               </div>
               <div className="new-ln ldrItem-seg" />
            </div>
         );
      });
   };

   const handleBackToCourses = () => {
      setCourseID(null);
      setResetCourses(true);
   };

   const renderCrseOrSeg = () => {
      if (viewSegLdrs) {
         return (
            <div>
               <div className="btnFlex">
                  <button
                     className="removeDefaults "
                     onClick={() => setViewSegLdrs(!viewSegLdrs)}
                  >
                     <div className="back-spacing ">
                        <IoArrowBack className="backToCourse" />
                        <p className="back-txt">Back</p>
                     </div>
                  </button>
               </div>
               <div>
                  <h1 className="margin-LR">{segLeaders[0].location_name}</h1>
                  <div className="line" />
                  <div className="ldrItem">
                     <p className="geo-title">
                        Leaderboard for the segment ending at geolocation&nbsp;
                        {segLeaders[0].location_name}
                     </p>
                  </div>
                  <div className="ldrItem">
                     <p className="geo-title">
                        within course&nbsp;{course.course_name}
                     </p>
                  </div>
                  <p>Segment location:</p>
                  <div className="ldrItem">
                     <p className="geoList">
                        Latitude: {segLeaders[0].latitude}
                     </p>
                     <p className="geoList">
                        Longitude: {segLeaders[0].longitude}
                     </p>
                  </div>
               </div>
               <div className="ldrItem-seg">
                  <p className="segList title">Username</p>
                  <div className="brk-ln " />
                  <p className="segList title">Date</p>
                  <div className="brk-ln " />
                  <p className="segList title">Distance (km)</p>
                  <div className="brk-ln " />
                  <p className="segList title">Completion Time (s)</p>
               </div>
               <div className="new-ln ldrItem-seg" />
               {renderSegLeaderBoard()}
            </div>
         );
      } else {
         return (
            <div className="center margin">
               <h3 className="ldr-title">
                  <div className="btnFlex">
                     <button
                        className="removeDefaults back-btn"
                        onClick={handleBackToCourses}
                     >
                        <IoArrowBack className="backToCourse" />
                        <p className="back-txt">Back</p>
                     </button>
                  </div>
                  {course.course_name} Leaderboard
                  <div className="empty-space" />
               </h3>
               <div className="ldr-line" />
               <p># of Geolocations: {course.locations}</p>
               <p>
                  Average Completion Time: {course.mean_completion_time / 1000}{" "}
                  seconds
               </p>
               <div className="ldr-parent-div">
                  <div className="ldrItem">
                     <p className="ldrList title">Username</p>
                     <div className="brk-ln " />
                     <p className="ldrList title">Date</p>
                     <div className="brk-ln" />
                     <p className="ldrList title">Completion Time (s)</p>
                     <div className="empty-space" />
                  </div>
                  <div className="new-line" />
                  {renderLeaderBoard()}
               </div>
            </div>
         );
      }
   };

   return (
      <div>
         {courseID ? (
            renderCrseOrSeg()
         ) : (
            <Courses leader={ldrBool} setCourseID={setCourseID} />
         )}
      </div>
   );
}

export default LeaderBoard;

// <div>
//     <h3>{course.course_name} Leaderboard</h3>
//     <p># of Geolocations: {course.locations}</p>
//     <p>Average Completion Time: {course.mean_completion_time/1000} seconds</p>
//     <div className="ldrItem">
//         <p className="ldrList title">Username</p>
//         <p className="ldrList title">Date</p>
//         <p className="ldrList title">Completion Time (s)</p>
//     </div>
//     {renderLeaderBoard()}
// </div>
