import React from 'react'
import './UserDash.css'
import { UserContext } from "../../context/UserContext";
import { useContext } from 'react';

function UserDash() {

    const { user } = useContext(UserContext);

    

   

   
    return (
        <div className = "title">
            <h2>{user.username}'s dashboard</h2>
        <div className = "info-box">
            
            username: {user.username}<br></br>
            email: {user.email}
        </div>
        </div>
    )
}

export default UserDash
