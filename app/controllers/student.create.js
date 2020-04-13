const Student = require('../models/student.model.js');

// Create and Save a new Student
exports.create = (req, res) => {

    console.log(req.body);
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            status: 400,
            message: "name cannot be empty"
        });
    }

    // Create a new Student
    const student = new Student({
        name: req.body.name,
        headActivity: req.body.headActivity,
        presenceActivity: req.body.presenceActivity,
        emotionActivity: req.body.emotionActivity
    });

    // Save Student into the database
    student.save()
    .then(data => {
        res.send({
            status:200,
            data:data,
            message:'Student created successfully'});
    }).catch(err => {
        res.status(500).send({
            status:500,
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};





// Update exsiting student's head activity
exports.updateHeadActivity = (req, res) => {
    console.log(req.body);
    const _name = req.body.name;
    Student.findOne({"name":_name})
    .then(student => {
        if(!student) {
            return res.status(400).send({
                status:400,
                message: "Student not found."
            });
        }
        // Update activityData of the user
        const _angle = req.body.headActivity.angle;
        const _dateTimeNow = Date.now();
        Student.updateOne(
            {"name": _name},
            {$push: {"headActivity": {angle:_angle,ts:_dateTimeNow}}}
        )
        .then(data => {
            if(!data ) {
                return res.status(404).send({
                    status:404,
                    message: "No data found. "
                });            
            }
            res.send(data);
        }).catch(err => {
            return res.status(500).send({
                status:500,
                message: err.message || "Error updating data with given parameters"
            });
        })
    })
};


// Update exsiting student's presence activity
exports.updatePresenceActivity = (req, res) => {
    console.log(req.body);
    const _name = req.body.name;
    Student.findOne({"name":_name})
    .then(student => {
        if(!student) {
            return res.status(400).send({
                status:400,
                message: "Student not found."
            });
        }
        // Update activityData of the user
        const _angle = req.body.presenceActivity.angle;
        const _dateTimeNow = Date.now();
        Student.updateOne(
            {"name": _name},
            {$push: {"presenceActivity": {present:_angle,ts:_dateTimeNow}}}
        )
        .then(data => {
            if(!data ) {
                return res.status(404).send({
                    status:404,
                    message: "No data found. "
                });            
            }
            res.send(data);
        }).catch(err => {
            return res.status(500).send({
                status:500,
                message: err.message || "Error updating data with given parameters"
            });
        })
    })
};
