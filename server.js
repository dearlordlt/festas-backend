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
var User = require('./models/users');
var Comment = require('./models/comments');
var Character = require('./models/characters');
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

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(config.allowedUrls.indexOf(req.url), req.url);

    if (token) {

        /*var decoded = jwt.decode(token, {complete: true});
        console.log(decoded.header);
        console.log(decoded.payload);*/
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.',
                    error: err
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else if(config.allowedUrls.indexOf(req.url) === -1) {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    } else {

        //if there is no token but api path is allowed through config
        next();
    }


});

/**
 * home route (GET http://localhost:9001/api) with instructions
 */
router.get('/', function (req, res) {
    res.json({
        message: 'howdy! api is running!',
        users: {
            getAllUsers: 'GET:          /api/users - Get all the users.',
            createUser: 'POST:          /api/users - Create a user.',
            getUserById: 'GET:          /api/users/:userId  Get a single user.',
            updateUserById: 'PUT:       /api/users/:userId  Update a user with new info.',
            deleteUserById: 'DELETE:    /api/users/:userId  Delete a user.'
        },
        comments: {
            getAllComments: 'GET:       /api/comments - Get all comments.',
            createComment: 'POST:       /api/comments - Create a comment.',
            getCommentsByTopic: 'GET:   /api/comments/:topic - get comments by topic.'
        },
        authenticate: {
            authenticate: 'POST:      /api/authenticate - send username and password to get token'
        }
    });
});

/**
 * Characters rest service
 */
require('./rest/character.rest.js')(router, Character);

/**
 * Users rest service
 */
require('./rest/users.rest.js')(router, User);

/**
 * Comments rest service
 */
require('./rest/comments.rest.js')(router, Comment);

/**
 * Authenticate rest service
 */

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) {
            console.log('ERROR AUTH USER: ' + err.errmsg);
            res.status(403).json({error: err});
            return;
        }

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Token is set!',
                    token: token,
                    userID: user._id,
                    username: user.username
                });
            }

        }

    });
});

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

