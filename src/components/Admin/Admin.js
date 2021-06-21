import React, {useContext} from 'react'
import {UserContext} from '../../context/UserContext' 
import './Admin.css'



function Admin() {
    const {user} = useContext(UserContext)
    
    return (
        <div>
            {user?.isadmin ? <div>You are an admin 
                
            </div> : 


            <div>You are not an admin</div>}
            Admin
        </div>
    )
}

export default Admin
