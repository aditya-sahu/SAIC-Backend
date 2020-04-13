const User = require('../models/student.model.js');

// Retrieve and return -> all students from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send({
            status:200,
            data:users,
            message: "Retrieved the students successfully"
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

//Find a single student -> Body must have a uid
exports.findById = (req, res) => {
    User.findOne({"_id":req.params._id})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found with id " + req.params._id
            });            
        }
        res.send({
            status:200,
            data:user,
            message: "User retrieved successfully"
        });
    }).catch(err => {
        return res.status(500).send({
            status:500,
            message: err.message || "Error retrieving user with id " + req.params.uid 
        });
    });
};