var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var log = require("./serverTools/log.js");
var mouveManager = require("./serverTools/mouveManager.js");
var configManager = require("./serverTools/configManager.js");
var path = require("path");
var CameraStream = require('./serverTools/cameraStream.js');

// global parameters
var controllerOnline = false;

// load config
var config = configManager.LoadConfig(path.join(__dirname, "config.xml"));

// create and conf camera raspistill
var camera = new CameraStream();
camera.doStart(config.cameraWidth, config.cameraHeight, config.cameraQuality);

// Send pictures when it come
var consume = function(buffer) { 
    res.write("--myboundary\r\n");
    res.write("Content-Type: image/jpeg\r\n");
    res.write("Content-Length: " + buffer.length + "\r\n"); 
    res.write("\r\n");
    res.write(buffer,'binary');
    res.write("\r\n");
}

// try to send pictures
camera.on('image', consume);

// load GPIO
mouveManager.loadGPIO(config);

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
// style
app.get('/styles/style_page.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_page.css");
});
app.get('/styles/style_trav_control.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_trav_control.css");
});
app.get('/styles/style_trav_simulation.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_trav_simulation.css");
});
app.get('/styles/style_custom_range.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_custom_range.css");
});
app.get('/styles/style_index.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_index.css");
});

// scripts js
// supervision
/*
app.get('/scripts/supervision/supervisionFunctions.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/supervision/supervisionFunctions.js");
});
app.get('/scripts/supervision/listenerSupervision.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/supervision/listenerSupervision.js");
});
app.get('/scripts/supervision/videoManager.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/supervision/videoManager.js");
});
*/
app.get('/scripts/script_control.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_control.js");
});
app.get('/scripts/script_trav_simulation.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_trav_simulation.js");
});
// Images
app.get('/img/icon_move_left.svg', function(req, res) {
    res.sendFile(__dirname + "/" + "site/img/icon_move_left.svg");
});
app.get('/img/icon_rotate_right.svg', function(req, res) {
    res.sendFile(__dirname + "/" + "site/img/icon_rotate_right.svg");
});
app.get('/img/camera_icon.ico', function(req, res) {
    res.sendFile(__dirname + "/" + "site/img/camera_icon.ico");
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
        camera.removeListener('image', consume);
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
        controllerOnline = false;
        log.writeLine("Controller exited : controllerOnline = " +controllerOnline);
        io.emit("controllerDisconnected", true);
        
    });
    socket.on("setSpeed", function (valueSpeed) {
        log.writeLine("speed change to : " +valueSpeed);
        mouveManager.setSpeed(valueSpeed);
        io.emit("changeSpeed", valueSpeed);
    });
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