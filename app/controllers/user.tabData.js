const User = require('../models/user.model.js');

// Update tabData of user -> REQUEST BODY must have uid and tabdata{url,title}
exports.updateTabData = (req, res) => {
    
    const _uid = req.body.uid;
    User.findOne({"uid":_uid})
    .then(user => {
        if(!user) {
            return res.status(400).send({
                status:400,
                message: "User not found."
            });
        }
        // Update tabData of the user
        const _url = req.body.tabData.url;
        const _title = req.body.tabData.title;
        const _openTime = Date.now();
        const _tabData = {"url":_url, "title":_title, "openTime":_openTime};
        
        // Check if current _tabData already exists in user's tabData?
        const retrievedTabData = user.tabData;
        async function updateTabDataFunction() {
        if(retrievedTabData.length > 5 ) {
            console.log('tryna delete...');
            var oldest = Number.MAX_VALUE;
            for(var i = 0; i < retrievedTabData.length; i++)
                if( retrievedTabData[i].openTime < oldest )
                    oldest = retrievedTabData[i].openTime;
            console.log(oldest);
            var filter = {"uid":_uid};
            var update = {$pull:{ "tabData": { "openTime":oldest}}};
            User.updateOne(filter,update)  
            .then(data => {
                if(!data) {
                    console.log('Data to be deleted not found ');
                    return res.send({"message":"not ok"});
                }
            }).catch(err => {
                console.log("Error deleting data");
                });

        }
        
        var flag = false;
        for(var i = 0; i < retrievedTabData.length; i++) {
            if(retrievedTabData[i].url == _tabData.url) {
                flag=true;
                break;
            }
        }
        if(flag==true) {
            filter = { "uid": _uid, "tabData.url": _url };
            update = { "$set": { "tabData.$.openTime": _openTime } };
            User.updateOne(filter,update)
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
                    message: err.message || "Error updating tabData with given parameters"
                });
            })
        }
        else {
            User.updateOne(
                    {"uid": _uid},
                    {$push: {"tabData": {url:_url,title:_title,openTime:_openTime}}}
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
                    message: err.message || "Error updating tabData with given parameters"
                });
            })
         }
        }
        updateTabDataFunction();
    });
    
        // If size = 5, remove last element and push... else just push it
};

// Check if host has whitelisted the parasite
function isWhitelist(_p_uid,_h_uid,callback) {
    User.findOne({"uid":_h_uid})
    .then(host => {
        if(!host) {
            return res.status(404).send({
                status: 404,
                message: "Host not found with id " + _h_uid
            });            
        }
        return callback(host.whitelist.includes(_p_uid,0));
    }).catch(err => {
        console.log("Error finding host.");
        return callback(false);
    });
}

// View tabData of user upon request -> URL must have uid of Parasite (p_uid) and uid of Host (h_uid)
exports.viewTabData = (req,res) => {
    var _p_uid = req.params.p_uid;
    var _h_uid = req.params.h_uid;
    isWhitelist(_p_uid,_h_uid, (access)=>{
        if (access == false) {
            return res.status(404).send({
                    status: 403,
                    message: "Access Denied"
            });   
        }
        User.findOne({"uid":req.params.h_uid})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    status: 404,
                    message: "User not found with id " + req.params.uid
                });            
            }

            // Sort the list on the order of time
            var _tabData = user.tabData;
            _tabData = _tabData.sort( (a,b) =>{
                return a.openTime - b.openTime;
            })
            res.send({
                status:200,
                data:_tabData,
                message: "User retrieved successfully"
            });
        }).catch(err => {
            return res.status(500).send({
                status:500,
                message: err.message || "Error retrieving user with id " + req.params.uid
            });
        });
    });
};
