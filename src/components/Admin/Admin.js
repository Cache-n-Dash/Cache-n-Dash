import React, {useContext,useEffect,useState} from 'react';
import {UserContext} from '../../context/UserContext'; 
import './Admin.css';
import axios from 'axios';
import {IoCheckmarkCircle} from "react-icons/io5"
import {IoSearchCircleSharp} from "react-icons/io5"

// Hello


function Admin() {

    const [users,setUsers] = useState([])
    const [search, setSearch] = useState('')

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

    const makeAdmin = (id) => {
        axios.put(`/admin/new/${id}`)
        .then(res=>{
            // console.log(res.data)
            setUsers(res.data)
        }).catch(err=>console.log(err))
    }

    const queryUsers = (search) => {
        const lowerSearch = search.toLowerCase()
        axios.get(`/admin/query?query=${lowerSearch}`) 
        .then(res => { 
            setUsers(res.data)
        }).catch(err=>console.log(err))  
    }

    

    const renderUsers = () => {
        if (users){
            return(
            
                users.map((usr,idx)=>{
                    // console.log((idx+1) % 2)
                    return(
                        <div className={(idx+1) % 2 === 0 ? 'containerDiv' : 'containerDiv rowColor'} key={idx}>
                            <p className="columnData">{usr.username}</p>
                            <div className="clBrk"/>
                            <p className="columnData">{usr.email}</p>
                            <div className="clBrk"/>
                            {String(usr.isadmin)==="true" ? <div className="columnData"><IoCheckmarkCircle className="circle"/></div> : <button className="columnData defaultBtn adminBtn" onClick={()=>makeAdmin(usr.user_id)}>+</button>}
                            <div className="clBrk"/>
                            <p className="columnData">{String(usr.verified)}</p>
                            <div className="clBrk"/>
                            {/* &nbsp; */}
                            <button className ="columnData defaultBtn btnSize" onClick={() => deleteUser(usr.user_id)} >Delete</button>
                            {/* {String(usr.isadmin)==='true' ? <p>Already an Admin</p> : <button onClick={()=>makeAdmin(usr.user_id)}>Make Admin</button>} */}
                        </div>
                    )
                })
            )   
        }
    }

    // console.log(user)
    
    return (
        <div className="adminContainer">
            {user.isadmin ? <div>
                <h3 className="welcome">Welcome , {user.username}!</h3>
                <br/>You can ... <br/><br/>
                <div className="rowDiv">- Create geocache locations and courses</div>
                {/* <br/> */}
                <div className="rowDiv">- View all users</div>
                {/* <br/> */}
                <div className="rowDiv">- Delete users (click on the &nbsp;<div className="btnSize fake"><div className="alignText">Delete</div></div>&nbsp;button)</div>
                {/* <br/> */}
                <div className="rowDiv">- Make a user an admin (click on the&nbsp;<div className="adminBtn fake">+</div>&nbsp;button)</div>
                {/* -edit/delete courses and geocache locations */}
                <br/><br/>
                **Geolocations and Courses can be created on the Map page**
                <br/><br/>
                <div className="searchDiv">
                    <input id="search-input" placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)}/>
                    <button className="defaultBtn" onClick={() => {queryUsers(search)}}><IoSearchCircleSharp className="circleSearch"/></button>
                </div>
                <div className="headerDiv">
                    <p className="columnTitle">Username</p>
                    <div className="clBrk"/>
                    <p className="columnTitle">Email</p>
                    <div className="clBrk"/>
                    <p className="columnTitle">Is Admin?</p>
                    <div className="clBrk"/>
                    <p className="columnTitle">Verified?</p>
                    <div className="clBrk"/>
                    <p className="columnTitle">Delete User</p>
                </div>
                {renderUsers()}
            </div> : 


            <div>You are not an admin </div>}
        </div>
    )
}

export default Admin

//