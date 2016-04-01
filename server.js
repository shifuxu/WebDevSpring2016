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
var cookie_secret = "xsf4662817";

function rootRequest (req, res) {
    res.send('hello world')
}

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610sp16Assignment';

// use remote connection string
// if running in remote server
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


var db = mongoose.connect(connectionString);

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

app.get('/hello', rootRequest);

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);