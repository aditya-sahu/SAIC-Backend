const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require Student routes
require('./app/routes/student.route.js')(app);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("\x1b[32m%s\x1b[0m","Successfully connected to the database");    
}).catch(err => {
    console.log("\x1b[31m%s\x1b[0m","Could not connect to the database. Exiting now...", err);
    process.exit();
});



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to SAIC server application!"});
});

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("\x1b[33m%s\x1b[0m","Server is listening on port 8080");
});