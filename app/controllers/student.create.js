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
        headActivity: req.body.headActivity || "NA",
        presenceActivity: req.body.presenceActivity || "NA",
        emotionActivity: req.body.emotionActivity || "NA"
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
