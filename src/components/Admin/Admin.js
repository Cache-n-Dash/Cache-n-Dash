import React, {useContext,useEffect,useState} from 'react';
import {UserContext} from '../../context/UserContext'; 
import './Admin.css';
import axios from 'axios';

// Hello


function Admin() {

    const [users,setUsers] = useState([])

    useEffect(() => {
        getUsers()
    },[])
    const {user} = useContext(UserContext)

    const getUsers = () => {
        axios.get('/admin/query')
        .then(res => setUsers(res.data))
    }

    const deleteUser = (id) => {
        axios.delete(`/admin/delete/user/${id}`)
        .then(res=>{
            setUsers(res.data)
        }).catch(err=>console.log(err))
    }

    const renderUsers = () => {
        if (users){
            return(
                users.map((usr,idx)=>{
                    console.log(usr)
                    return(
                        <div className="containerDiv" key={idx}>
                            <p className="columnData">{usr.username}</p>
                            <p className="columnData">{usr.email}</p>
                            <p className="columnData">{String(usr.isadmin)}</p>
                            <p className="columnData">{String(usr.verified)}</p>
                            &nbsp;
                            <button className ="delete-button" onClick={() => deleteUser(usr.user_id)} >Delete</button>
                        </div>
                    )
                })
            )   
        }
    }

    console.log(user)
    
    return (
        <div className="adminContainer">
            {user.isadmin ? <div>You are an admin..
                -create geocache locations and courses
                -make other users admin?
                -edit/delete courses and geocache locations

                **You can add geolocations on the Map page**
                <div className="headerDiv">
                    <p className="columnTitle">Username</p>
                    <p className="columnTitle">email</p>
                    <p className="columnTitle">isadmin</p>
                    <p className="columnTitle">verified</p>
                </div>
                {renderUsers()}
            </div> : 


            <div>You are not an admin </div>}
        </div>
    )
}

export default Admin
