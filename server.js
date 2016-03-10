var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3020;
var cookie_secret = "xsf4662817";

function rootRequest (req, res) {
    res.send('hello world')
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: cookie_secret,
    resave: true,
    saveUninitialized: true
}));

app.get('/hello', rootRequest);

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);