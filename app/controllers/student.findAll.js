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

// // Find a single user -> Body must have a uid
// exports.findByuid = (req, res) => {
//     User.findOne({"uid":req.params.uid})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 status: 404,
//                 message: "User not found with id " + req.params.uid
//             });            
//         }
//         res.send({
//             status:200,
//             data:user,
//             message: "User retrieved successfully"
//         });
//     }).catch(err => {
//         return res.status(500).send({
//             status:500,
//             message: err.message || "Error retrieving user with id " + req.params.uid 
//         });
//     });
// };