const User = require('../models/user.model.js');

// If a parasite requests host, whitelist them -> Body must have parasite and host uid
exports.doWhitelist = (req,res) => {
    var _p_uid = req.body.p_uid;
    var _h_uid = req.body.h_uid;

    // Check if p_uid does not already exists inside host whitelist
    User.findOne({"uid": _h_uid})
    .then(host => {
        if(!host ) {
            return res.status(404).send({
                status:404,
                message: "No data found. "
            });      
        }
        if(host.whitelist.includes(_p_uid))
        {
            return res.status(403).send({
                status:403,
                message: "Already whitelisted."
            });      
        }
        filter = { "uid": _h_uid };
        update = { $push: { "whitelist": _p_uid } };
        User.updateOne(filter,update)
        .then(data => {
            if(!data ) {
                return res.status(404).send({
                    status:404,
                    message: "No data found. "
                });      
            }
            res.send(data);
        })
    }).catch(err => {
        return res.status(500).send({
            status:500,
            message: err.message || "Error updating tabData with given parameters"
        });
    });
}

// Remove a parasite from host whitelist -> Body must have parasite and host uid
exports.removeFromWhitelist = (req,res) => {
    var _p_uid = req.body.p_uid;
    var _h_uid = req.body.h_uid;

    // If not found, don't update...
    User.findOne({"uid": _h_uid})
    .then(host => {
        if(!host) {
            console.log('Data to be deleted not found ');
            return res.status(404).send({status:404,message:"not ok"});
        }
        if(host.whitelist.includes(_p_uid) == false) {
            return res.status(404).send({status:404,message:"Parasite not found in host"});
        }
        filter = {"uid":_h_uid};
        update = {$pull:{ "whitelist": _p_uid}};
        User.updateOne(filter,update)  
        .then(data => {
            if(!data) {
                console.log('Data to be deleted not found ');
                return res.status(404).send({status:404,message:"not ok"});
            }
            res.send(data);
        })
    }).catch(err => {
        return res.status(500).send({
            status:500,
            message: err.message || "Error finding parasite in host:"
        })
    })
};
