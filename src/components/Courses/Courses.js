import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import './Course.css'

function Courses() {
    const [selected,setSelected,courses,setCrseLocs,setOneCourse] = useContext(DataContext)

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
                        <button className="courseBtn" onClick={handleCourseClick}><div className="btnDiv numDiv">{idx+1}</div><div className="btnDiv">{crse.course_name}</div><div className="btnDiv">{crse.locations}</div><div className="btnDiv">{avg/1000}</div></button>
                    </div>
                )
            })
        )
    }

    return (
        <div className="containerDiv">
            <div className="tableHeaderDiv"><p className="tableHeader crseLayout numDiv">Number</p><p className="tableHeader crseLayout">Course Name</p><p className="tableHeader crseLayout"># of Geolocations</p><p className="tableHeader crseLayout">Avg Completion Time</p></div>
            {renderCourses()}
        </div>
    )
}

export default Courses

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