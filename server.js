var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3020;

function rootRequest (req, res) {
    res.send('hello world')
}

app.use(express.static(__dirname + '/public'))

app.get('/hello', rootRequest);
app.listen(port, ipaddress);