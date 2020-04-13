module.exports = (app) => {
    
    const studentCreate = require('../controllers/student.create.js');
    const studentSearch = require('../controllers/student.findAll.js');

    // Create a new Student
    app.post('/students/addStudent', studentCreate.create);

    // Update existing Student Head activity
    app.post('/students/updateHeadActivity', studentCreate.updateHeadActivity);

    // Update existing Student Presence activity
    app.post('/students/updatePresenceActivity', studentCreate.updatePresenceActivity);

    // Retrieve all students
    app.get('/students/getStudents', studentSearch.findAll);
    
    
    /*
    
    
    // Retrieve a single user using uid
    app.get('/users/getUsers/:uid', userSearch.findByuid);

   // Update user tab data
   app.put('/users/updateTabData/', userTabData.updateTabData);

   // Retrieve Tab data of user
   app.get('/users/viewTabData/:p_uid/:h_uid', userTabData.viewTabData);

   // Do white list a parasite
   app.put('/users/doWhitelist/', userWhitelist.doWhitelist);

   // Remove from white list a parasite
   app.put('/users/removeFromWhitelist/', userWhitelist.removeFromWhitelist);

   // Delete a User with uid
   app.delete('/users/deleteUser/:uid', userDelete.delete);
   */
}