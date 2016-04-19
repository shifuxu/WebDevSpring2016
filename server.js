var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var passport = require('passport');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3020;
var cookie_secret = process.env.COOKIE_SECRET;

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610sp16Assignment';

// use remote connection string, if running in remote server
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to mongodb
var db = mongoose.connect(connectionString);

// add body parser, multer, express, cookie parser, session and passport js
app.use(express.static(__dirname + '/public'));
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: cookie_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// deal with the share passport js problem
// define the project user model
var ProjectUserSchema = require("./public/project/server/models/user.schema.server.js")(mongoose);
var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);
var ProjectUserModel = require('./public/project/server/models/user.model.server.js')(db, mongoose, ProjectUser);

// define the assignment user model
var AssignmentUserSchema = require("./public/assignment/server/models/user.schema.server.js")(mongoose);
var AssignmentUser = mongoose.model("AssignmentUser", AssignmentUserSchema);
var AssignmentUserModel = require('./public/assignment/server/models/user.model.js')(db, mongoose, AssignmentUser);

// define my self implemented shared serialized solution for passport js
var UserSerializer =
    require("./public/security/security.js")(app, ProjectUserModel, AssignmentUserModel, passport);

// pass app, db, mongoose and user model
require("./public/assignment/server/app.js")(app, db, mongoose, passport, AssignmentUserModel);
require("./public/project/server/app.js")(app, db, mongoose, passport, ProjectUserModel);

app.listen(port, ipaddress);