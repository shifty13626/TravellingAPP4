var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var log = require("./serverTools/log.js");
var mouveManager = require("./serverTools/mouveManager.js");

// global parameters
var portNumber = 8080;
var controllerOnline = false;

// file getters
// main page html
app.get('/', function(req, res){
    log.writeLine("Send page index.html");
    res.sendFile(__dirname + '/site/index.html');
    io.emit("controllerDisconnected", true);
});
// page controler
app.get('/pages/controllerPage.html', function(req, res){
    if (!controllerOnline)
    {
        log.writeLine("Send page controller.html");
        log.writeLine("Controller online");
        res.sendFile(__dirname + '/site/pages/controllerPage.html');
        controllerOnline = true;       
    }
    else    // pirate page
    {
        log.writeLine("##### PIRATE try open controller by URL ######");
        res.sendFile(__dirname + '/site/pages/piratePage.html');
    }
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
    socket.on('disconnect', function(name){
        log.writeLine('user disconnected');
    });
    // default stop 
    io.emit('stop');
    // display by default mid speed value
    io.emit('changeSpeed', 5);
    // display controller state
    sendInitialControllerState();
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
        io.emit('changeSpeed', 5);
    });
    socket.on("exitController", function() {
        log.writeLine("Controller exited");
        io.emit("controllerDisconnected", true);
        controllerOnline = false;
    });
});

// broadcast sender message by socket
io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

// open server
http.listen(portNumber, function(){
    log.initSession(portNumber);
});

function sendInitialControllerState() {
    log.writeLine("Send initial state of controller, actual state, controller online : " +controllerOnline);
    if (controllerOnline)
        io.emit("controllerConnected", true);
    else
        io.emit("controllerDisconnected", true);
}