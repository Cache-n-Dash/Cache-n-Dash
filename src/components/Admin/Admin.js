import React, {useContext} from 'react'
import {UserContext} from '../../context/UserContext' 
import './Admin.css'

// Hello


function Admin() {
    const {user} = useContext(UserContext)

    console.log(user)
    
    return (
        <div>
            {user.isadmin ? <div>You are an admin..
                -create geocache locations and courses
                -make other users admin?
                -edit/delete courses and geocache locations

  
            </div> : 


            <div>You are not an admin :(</div>}
        </div>
    )
}

export default Admin
