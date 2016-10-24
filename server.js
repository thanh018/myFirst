var express = require('express');
var app = express();

var mongoose = require('mongoose');
var db = require('./config/database');
mongoose.connect(db.url);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

// require('./app/routes/index.js')(app);

var routes =require('./app/routes');
 
routes(app);

server.listen(port);
console.log('Server is running on '+ port);
exports = module.exports=app;