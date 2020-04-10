const User = require('../models/user.model.js');

// Delete a user with the specified uid in the request)
exports.delete = (req, res) => {
    User.findOne({"uid":req.params.uid})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found with id " + req.params.uid
            });            
        }
        User.deleteOne({"uid":req.params.uid})
        .then(users => {
            res.send({
                status:200,
                data:users,
                message: "Deleted the users successfully"
            });
        }).catch(err => {
            res.status(500).send({
                status:500,
                message: err.message || "Some error occurred while deleting user."
        });
    });
}).catch(err => {               
        return res.status(500).send({
            status:500,
            message: err.message || "Error deleting user with id " + req.params.uid
        });
    });

};