module.exports = {
    getLocation: (req,res)=>{
        const db = req.app.get('db')
        const {location_id} = req.params;
        const id = +location_id;
        db.geolocations.get_location(id)
        .then(data=>{
            res.status(200).send(data[0])
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    addLocation: (req,res)=>{
        const db = req.app.get('db')
        const {locationName,latitude,longitude} = req.body;
        db.geolocations.add_location(locationName,latitude,longitude)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getLocations: (req,res)=>{
        const db = req.app.get('db')
        db.geolocations.get_all_locations()
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getCourseStartLocations: (req,res)=>{
        const db = req.app.get('db')
        db.geolocations.get_course_start_locations()
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getAllCourseLocations: (req,res)=>{
        const db = req.app.get('db')
        const {course_id} = req.params;
        const id = +course_id;
        db.geolocations.get_all_course_locs(id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getSegmentLocations: (req,res)=>{
        const db = req.app.get('db')
        let {seg1,seg2} = req.params;
        seg1 = +seg1;
        seg2 = +seg2;
        db.geolocations.get_segment(seg1,seg2)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}