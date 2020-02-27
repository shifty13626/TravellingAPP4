var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var log = require("./serverTools/log.js");
var mouveManager = require("./serverTools/mouveManager.js");
var configManager = require("./serverTools/configManager.js");
var path = require("path");


// global parameters
var controllerOnline = false;

// load config
var config = configManager.LoadConfig(path.join(__dirname, "config.xml"));

// load GPIO
mouveManager.loadGPIO(config);

// file getters
// pages html
app.get('/', function(req, res){
    log.writeLine("Send page index.html");
    res.sendFile(__dirname + '/site/index.html');
    io.emit("controllerDisconnected", true);
});
app.get('/pages/controllerPage.html', function(req, res){
    if (!controllerOnline)
    {
        controllerOnline = true; 
        log.writeLine("Send page controller.html");
        log.writeLine("Controller online : controllerOnline = " +controllerOnline);
        res.sendFile(__dirname + '/site/pages/controllerPage.html');
              
    }
    else    // pirate page
    {
        log.writeLine("##### PIRATE try open controller by URL ######");
        res.sendFile(__dirname + '/site/pages/piratePage.html');
    }
});

// styles
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
    socket.on("exitController", function() {
        controllerOnline = false;
        log.writeLine("Controller exited : controllerOnline = " +controllerOnline);
        io.emit("controllerDisconnected", true);
        
    });

    socket.on('mouveWagon', function(msg){
        io.emit('mouveWagon');
        log.writeLine(msg);
        mouveManager.mouveWagon(config);
    });
    socket.on('brakeWagon', function(msg){
        io.emit('brakeWagon');
        log.writeLine(msg);
        mouveManager.brakeWagon(config);
    });

    socket.on('stop', function(msg){
        io.emit('stop');
        log.writeLine(msg)
        mouveManager.mouveStop();
        io.emit('changeSpeed', 5);
    });
    
    socket.on("setSpeed", function (valueSpeed) {
        log.writeLine("speed wagon change to : " +valueSpeed);
        mouveManager.setspeedWagon(valueSpeed);
        io.emit("changeSpeed", valueSpeed);
    });
    socket.on("setSpeedCamera", function (valueSpeed) {
        log.writeLine("speed camera change to : " +valueSpeed);
        mouveManager.setSpeedRotationCamera(valueSpeed);
        io.emit("setSpeedCamera", valueSpeed);
    })
});

// broadcast sender message by socket
io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

// open server
http.listen(config.portServer, function(){
    log.initSession(config.portServer);
});


// method to send initial state of connection for controller
function sendInitialControllerState() {
    log.writeLine("Send initial state of controller, actual state, controller online : " +controllerOnline);
    if (controllerOnline)
        io.emit("controllerConnected", true);
    else
        io.emit("controllerDisconnected", true);
}