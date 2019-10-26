var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var log = require("./serverTools/log.js");
var mouveManager = require("./serverTools/mouveManager.js");

var portNumber = 8080;
var userConnected = false;

// file getters
// main page html
app.get('/', function(req, res){
    log.writeLine("Send page index.html");
    res.sendFile(__dirname + '/site/index.html');
});
// page controler
app.get('/pages/controllerPage.html', function(req, res){
    log.writeLine("Send page controller.html");
    res.sendFile(__dirname + '/site/pages/controllerPage.html');
});
// style
app.get('/stylePage.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/stylePage.css");
});

// scripts js
// supervision
app.get('/scripts/supervision/supervisionFunctions.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/supervision/supervisionFunctions.js");
});
app.get('/scripts/supervision/listenerSupervision.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/supervision/listenerSupervision.js");
});
// controller
app.get('/scripts/controller/eventsFunctionsController.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/controller/eventsFunctionsController.js");
});
app.get('/scripts/controller/listenerController.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/controller/listenerController.js");
});

// to log connection and deconnection of an user 
io.on('connection', function(socket){
    log.writeLine('a user connected');
    userConnected = true;
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('mouveBack', function(msg){
        io.emit('mouveBack');
        log.writeLine(msg);
        mouveManager.mouveBack();
    });
    socket.on('mouveFront', function(msg){
        io.emit('mouveFront');
        log.writeLine(msg);
        mouveManager.mouveFront();
    });
    socket.on('stop', function(msg){
        io.emit('stop');
        log.writeLine(msg)
        mouveManager.mouveStop();
    });
    socket.on('setSpeed', function(msg){
        //io.emit('stop');
        try {
            mouveManager.setSpeed(msg)
        }
        catch(e)
        {
            log.writeLine("Error set speed wagon value");
        }
        callback = true;
    });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

http.listen(portNumber, function(){
    log.initSession(portNumber);
});