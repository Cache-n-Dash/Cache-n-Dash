import React from 'react'
import './Course.css'

function Course() {

    const handleTraining = () => {
        console.log('training now!')
    }

    return (
        <div>
            <div>mini map of the course will be at the top of the screen</div>

            {/* we can map over the geolocations for the course to produce the list and then allow the user to click on a list item to show the latitude and longitude coordinates for the location */}
            <ul>
                <li>name of first geolocation</li>
                <li>name of second geolocation</li>
                <li>name(s) of additional geolocations</li>
            </ul>

            {/* when clicked the button will check the current location of the user.  If the user is at the first geolocation an activity will be created in the database.  If not, the user will be presented with an error message notifying them that they need to be at the start before they can begin training */}
            <button onClick={handleTraining}>Train Now!</button>
        </div>
    )
}

export default Course