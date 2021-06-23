import React from 'react'
import { useState,useEffect } from 'react'
import './LeaderBoard.css'
import axios from 'axios'
import {IoCaretForwardSharp} from 'react-icons/io5'
import {IoCaretDownSharp} from 'react-icons/io5'
// import {IoArrowForwardCircleSharp} from 'react-icons/io5'
import {IoArrowForwardSharp} from 'react-icons/io5'
// import {IoArrowBackSharp} from 'react-icons/io5'
import {IoArrowUndoSharp} from 'react-icons/io5'

function LeaderBoard() {
    const [course,setCourse] = useState({})
    const [courseID,setCourseID] = useState(14)
    const [courseLeaders,setCourseLeaders] = useState([])
    const [openID,setOpenID] = useState(null)
    const [actLocs,setActLocs] = useState([])
    const [viewSegLdrs,setViewSegLdrs] = useState(false)
    const [segLeaders,setSegLeaders] = useState([])
    // const [segmentLocs,setSegmentLocs] = useState([])

    useEffect(()=>{
        axios.get(`/courses/${courseID}`)
        .then(res=>{
            setCourse(res.data[0])
            // console.log(res.data[0])
        }).catch(err=>console.log(err))
        axios.get(`/leaderboard/${courseID}`)
        .then(res=>{
            setCourseLeaders(res.data)
            // console.log(res.data)
        }).catch(err=>console.log(err))
    },[courseID])

    const handleClick = (id) => {
        if(openID===id){
            setOpenID(null)
            setActLocs([])
        }else{
            setOpenID(id)
            axios.get(`/activity/locations/${id}`)
            .then(res=>{
                // console.log(res.data)
                setActLocs(res.data)
            }).catch(err=>console.log(err))
        }
    }

    const renderCaret = (id) => {
        if(openID===id){
            return(
                <IoCaretDownSharp/>
            )
        }else{
            return(
                <IoCaretForwardSharp/>
            )
        }
    }

    const handleSwitch = async (id) => { // async
        try{
            const cLoc = await axios.get(`/courses/locations/${id}`)
            const cl = cLoc.data[0]
            // console.log(cl)

            const segLdrs = await axios.get(`/leaderboard/${cl.location_id}/${cl.course_id}`)
            const sl = segLdrs.data
            // console.log(sl)

            setSegLeaders(sl)
            setViewSegLdrs(!viewSegLdrs)
        }catch (error) {
            console.log(error)
        }
    }

    const handleActivityLocs = (ldr) => {
        if(openID===ldr.activity_id && actLocs){
            return(
                actLocs.map((seg,idx)=>{

                    const renderLocNum = () => {
                        if(idx===course.locations){
                            return(
                                <p className="ldrList">Location Number: {1}</p>
                            )
                        }else{
                            return(
                                <p className="ldrList">Location Number: {idx+1}</p>
                            )
                        }
                    }

                    const renderSegTime = () => {
                        if(idx===0){
                            return(
                                <p className="ldrList">{seg.start_end}</p>
                            )
                        }else{
                            return(
                                <p className="ldrList">Segment Time: {seg.seg_time/1000} s</p>
                            )
                        }
                    }

                    const renderSegLdrBtn = () => {
                        if(idx !== 0){
                            return(
                                <button className="removeDefaults" onClick={()=>handleSwitch(seg.cloc_id)}><IoArrowForwardSharp/></button>
                            )
                        }else{
                            return(
                                <div className="empty"></div>
                            )
                        }
                    }

                    return(
                        <div className="ldrItem" key={idx}>
                            {/* <p className="ldrList">Location Number: {idx+1}</p> */}
                            {renderLocNum()}
                            {/* <p className="ldrList">Segment Time: {seg.seg_time}</p> */}
                            {renderSegTime()}
                            {renderSegLdrBtn()}
                        </div>
                    )
                })
            )
        }
    }

    const renderLeaderBoard = () => {
        return(
            courseLeaders.map((ldr,idx)=>{
                return(
                    <div key={idx}>
                        <div className="ldrItem">
                            <p className="ldrList">{ldr.username}</p>
                            <p className="ldrList">{ldr.activity_date}</p>
                            <p className="ldrList">{ldr.comp_time/1000}</p>
                            <button className="removeDefaults" onClick={()=>handleClick(ldr.activity_id)}>{renderCaret(ldr.activity_id)}</button>
                        </div>
                        {handleActivityLocs(ldr)}
                    </div>
                )
            })
        )
    }

    const renderSegLeaderBoard = () => {
        return(
            segLeaders.map((ldr,idx)=>{
                return(
                    <div className="ldrItem" key={idx}>
                        <p className="segList">{ldr.username}</p>
                        <p className="segList">{ldr.activity_date}</p>
                        <p className="segList">{ldr.seg_dist}</p>
                        <p className="segList">{ldr.seg_time/1000}</p>
                    </div>
                )
            })
        )
    }

    const renderCrseOrSeg = () => {
        if(viewSegLdrs){
            return(
                <div>
                    <div className="btnFlex">
                        <button className="removeDefaults" onClick={()=>setViewSegLdrs(!viewSegLdrs)}><IoArrowUndoSharp className="backToCourse"/></button>
                    </div>
                    <div>
                        <div className="ldrItem">
                            <p>Leaderboard for the segment ending at geolocation&nbsp;</p>
                            <p className="boldText">{segLeaders[0].location_name}</p>
                        </div>
                        <div className="ldrItem">
                            <p>within course&nbsp;</p>
                            <p className="boldText">{course.course_name}</p>
                        </div>
                        <p>End segment location at:</p>
                        <div className="ldrItem">
                            <p className="geoList">Latitude: {segLeaders[0].latitude}</p>
                            <p className="geoList">Longitude: {segLeaders[0].longitude}</p>
                        </div>
                    </div>
                    <div className="ldrItem">
                        <p className="segList title">Username</p>
                        <p className="segList title">Date</p>
                        <p className="segList title">Distance (km)</p>
                        <p className="segList title">Completion Time (s)</p>
                    </div>
                    {renderSegLeaderBoard()}
                </div>
            )
        }else{
            return(
                <div>
                    <h3>{course.course_name} Leaderboard</h3>
                    <p># of Geolocations: {course.locations}</p>
                    <p>Average Completion Time: {course.mean_completion_time/1000} seconds</p>
                    <div className="ldrItem">
                        <p className="ldrList title">Username</p>
                        <p className="ldrList title">Date</p>
                        <p className="ldrList title">Completion Time (s)</p>
                    </div>
                    {renderLeaderBoard()}
                </div>
            )
        }
    }

    return (
        <div>
            {renderCrseOrSeg()}
        </div>
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
    )
}

export default LeaderBoard
