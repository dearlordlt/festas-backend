// ==========
// BASE SETUP
// ==========

var express = require('express');           // express
var app = express();                        // define app
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var Registration = require('./models/registration');
var Posts = require('./models/posts');
var colors = require('colors');            // use colors in console
var jwt = require('jsonwebtoken');

mongoose.connect(config.database);

app.set('superSecret', config.secret);

app.use(cors());
app.use(morgan('dev'));                    // logger
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ======
// ROUTES
// ======

var port = process.env.PORT || 9001;       // port
var router = express.Router();

router.use(function (req, res, next) {
    //Allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //Response type
    res.setHeader("Content-Type", "application/json");

    next();
});

/**
 * Registration rest service
 */
require('./rest/registration.rest.js')(router, Registration);

/**
 * Posts rest service
 */
require('./rest/posts.rest.js')(router, Posts);


// ======================================================
// REGISTER ROUTES: all routes will be prefixed with /api
app.use('/api', router);
// ======================================================

// ================
// START THE SERVER
// ================
app.listen(port);
var logMessage = 'API is running on: http://localhost:' + port + '/api';
console.log(logMessage);

