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
        const {courseName,numlocs,loc1,loc2,loc3,loc4,loc5,dist12,dist23,dist34,dist45,distEnd} = req.body;
        db.courses.create_course(courseName,numlocs,loc1,loc2,loc3,loc4,loc5,dist12,dist23,dist34,dist45,distEnd)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    updateCompTime: (req,res) => {
        const db = req.app.get('db')
        const {course_id} = req.params;
        const id = +course_id;
        db.courses.avg_comp_time(id)
        .then(avg=>{
            db.courses.update_avg_time(id,avg)
            .then(()=>{
                res.sendStatus(200)
            }).catch(err=>{
                console.log(err)
                res.status(500).send(err)
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}