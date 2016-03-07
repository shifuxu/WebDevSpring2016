var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var session       = require('express-session');
//var cookieParser  = require('cookie-parser');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3020;

function rootRequest (req, res) {
    res.send('hello world')
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', rootRequest);

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);