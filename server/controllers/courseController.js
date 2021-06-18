module.exports = {
    getCourse: (req,res) => {
        const db = req.app.get('db')
        const {course_id} = req.params;
        const id = +course_id;
        db.courses.get_course(id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getCourses: (req,res) => {
        const db = req.app.get('db')
        db.courses.get_courses()
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    createCourse: (req,res) => {
        const db = req.app.get('db')
        // const {courseName,numlocs,loc1,loc2,loc3,loc4,loc5,dist12,dist23,dist34,dist45,distEnd} = req.body;
        const {courseName,numlocs} = req.body;
        // db.courses.create_course(courseName,numlocs,loc1,loc2,loc3,loc4,loc5,dist12,dist23,dist34,dist45,distEnd)
        db.courses.create_course(courseName,numlocs)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    createCourseLoc: (req,res) => {
        const db = req.app.get('db')
        let {course_id,location_id,location_num} = req.params;
        course_id = +course_id
        location_id = +location_id
        location_num = +location_num
        const {seg_dist} = req.body;
        db.courses.create_course_loc(course_id,location_id,location_num,seg_dist)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    updateCompTime: async (req,res) => {
        const db = req.app.get('db')
        const {course_id} = req.params;
        const id = +course_id;
        const [startAvg] = await db.courses.avg_start_time(id);
        const [endAvg] = await db.courses.avg_end_time(id);
        const avgTime = endAvg-startAvg;
        // db.courses.avg_comp_time(id)
        // .then(avg=>{
        const [data] = await db.courses.update_avg_time(id,avgTime)
        return res.status(200).send(data)
            // .then(()=>{
            //     res.sendStatus(200)
            // }).catch(err=>{
            //     console.log(err)
            //     res.status(500).send(err)
            // })
        // }).catch(err=>{
        //     console.log(err)
        //     res.status(500).send(err)
        // })
    }
}