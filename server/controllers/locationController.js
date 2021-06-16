module.exports = {
    getLocation: (req,res)=>{
        const db = req.app.get('db')
        const {location_id} = req.params;
        const id = +location_id;
        db.geolocations.get_location(id)
        .then(data=>{
            res.status(200).send(data)
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
    getCourseLocations: (req,res)=>{
        const db = req.app.get('db')
        db.geolocations.get_course_start_locations()
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}