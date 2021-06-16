module.exports = {
    getCourseLeaderboard: (req,res) => {
        const db = req.app.get('db')
        const {course_id} = req.params;
        const id = +course_id;
        db.activities.get_course_leaderboard(id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getSegmentLeaderboard: (req,res) => {
        const db = req.app.get('db')
        const {seg1,seg2} = req.body;
        db.activities.get_segment_leaderboard(seg1,seg2)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    startActivity: (req,res) => {
        const db = req.app.get('db')
        // either course_id or user_id could be moved to req.body if needed
        let {course_id,user_id} = req.params;
        course_id = +course_id;
        user_id = +user_id;
        // date can be created using new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
        // startTime can be created using Date.now() with the output in milliseconds
        const {date,startTime} = req.body;
        db.activities.start_activity(course_id,user_id,date,startTime)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    editActivity: (req,res) => {
        const db = req.app.get('db')
        const {activity_id} = req.params;
        const id = +activity_id;
        const {timestamp,timeloc,completeBool} = req.body;
        db.activities.edit_activity(id,timestamp,timeloc,completeBool)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
}