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
        // let {seg1,seg2} = req.params;
        // seg1 = +seg1
        // seg2 = +seg2
        let {location_id,course_id} = req.params;
        location_id = +location_id
        course_id = +course_id
        // db.activities.get_segment_leaderboard(seg1,seg2)
        db.activities.get_segment_leaderboard(location_id,course_id)
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
        // const {date,startTime} = req.body;
        const {date} = req.body;
        // db.activities.start_activity(course_id,user_id,date,startTime)
        db.activities.start_activity(course_id,user_id,date)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    performActivity: async (req,res) => {
        const db = req.app.get('db')
        let {activity_id,cloc_id} = req.params;
        activity_id = +activity_id;
        cloc_id = +cloc_id;
        // const {timestamp,timeloc,completeBool} = req.body;
        const {timestamp,startEnd} = req.body;
        const [locNum] = await db.courses.get_crse_loc_num(cloc_id)
        let segTime = null;
        if(locNum===1 && startEnd==='START'){
            // const segTime = null;
        }else{
            const [timeStart] = await db.activities.find_seg_time_start(activity_id,locNum)
            if(timeStart){
                segTime = timestamp-timeStart;
            }
        }
        const [data] = await db.activities.perform_activity(activity_id,cloc_id,timestamp,segTime,startEnd)
        return res.status(200).send(data)
        // .then(data=>{
        //     res.status(200).send(data)
        // }).catch(err=>{
        //     console.log(err)
        //     res.status(500).send(err)
        // })
    },
    completeActivity: async (req,res)=>{
        const db = req.app.get('db')
        const {activity_id} = req.params;
        const id = +activity_id;
        const [start] = await db.activities.find_time_start(id)
        const [end] = await db.activities.find_time_end(id)
        const compTime = end-start;
        const [data] = await db.activities.update_comp_time(id,compTime)
        return res.status(200).send(data)
    }
}