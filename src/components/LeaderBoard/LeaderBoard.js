import React from 'react'
import { useState,useEffect } from 'react'
import './LeaderBoard.css'
import axios from 'axios'

function LeaderBoard() {
    const [course,setCourse] = useState({})
    const [courseID,setCourseID] = useState(14)
    const [courseLeaders,setCourseLeaders] = useState([])
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
        }).catch(err=>console.log(err))
    },[courseID])

    return (
        <div>
            Leaderboard
        </div>
    )
}

export default LeaderBoard
