import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./Courses.css";
import axios from "axios";
import { IoChevronForward } from "react-icons/io5";
// import { IoClose } from "react-icons/io5";

function Courses(props) {
   const { selected, setSelected, courses, setCrseLocs, setOneCourse } =
      useContext(DataContext);

   const renderCourses = () => {
      return courses.map((crse, idx) => {
         let avg = crse.mean_completion_time;
         if (avg === null) {
            avg = "--";
         } else {
            avg = avg / 1000;
         }

         const handleCourseClick = () => {
            if (!props.leader) {
               axios
                  .get(`/locations/courses/${crse.course_id}`)
                  .then((res) => {
                     // console.log(res.data)
                     setCrseLocs(res.data);
                     setOneCourse(crse);
                  })
                  .catch((err) => console.log(err));
               setSelected(!selected);
            } else {
               props.setCourseID(crse.course_id);
            }
         };

         return (
            <div className={(idx+1) % 2 === 0 ? "course-parent" : "course-parent colorChange"} key={idx}>
               <button className="course-btn">
                  <div className="btn-div table1">{idx + 1}</div>
                  <div className="brk-ln" />
                  <div className="btn-div table2">{crse.course_name}</div>
                  <div className="brk-ln" />
                  <div className="btn-div table3">{crse.locations}</div>
                  <div className="brk-ln" />
                  <div className="btn-div table4">{avg}</div>
                  <button className="leader-btn" onClick={handleCourseClick}>
                     <IoChevronForward className="forward-btn" />
                     <p className="leader-txt">LeaderBoard</p>
                  </button>
               </button>
               <div className="new-line-cr" />
            </div>
         );
      });
   };

   return (
      <div className="center margin">
         <h1>Courses</h1>
         <div className="ldr-line" />
         <div className="flex-Container center">
            <div className="table-header-div">
               <p className="table-header table1">#</p>
               <div className="brk-ln" />
               <p className="table-header table2">Course Name</p>
               <div className="brk-ln" />
               <p className="table-header table3">Cache Sites</p>
               <div className="brk-ln" />
               <p className="table-header table4">Avg Time (s)</p>
               <div className="empty-space" />
            </div>
            <div className="new-line" />
            {renderCourses()}
         </div>
      </div>
   );
}

export default Courses;

// const handleTraining = () => {
// console.log('training now!')
// }

//<div>mini map of the course may be here, at the top of the screen</div>

//{/* we can map over the geolocations for the course to produce the list and then allow the user to click on a list item to show the latitude and longitude coordinates for the location */}
//<ul>
//  <li>name of first geolocation</li>
//<li>name of second geolocation</li>
//<li>name(s) of additional geolocations</li>
//</ul>

//{/* when clicked the button will check the current location of the user.  If the user is at the first geolocation an activity will be created in the database.  If not, the user will be presented with an error message notifying them that they need to be at the start before they can begin training */}
//<button onClick={handleTraining}>Train Now!</button>
