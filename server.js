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
//mouveManager.loadGPIO(config);

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
// style
app.get('/styles/style_page.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_page.css");
});
app.get('/styles/style_control.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_control.css");
});
app.get('/styles/style_supervision.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_supervision.css");
});
app.get('/styles/style_custom_range.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_custom_range.css");
});
app.get('/styles/style_index.css', function(req, res) {
    res.sendFile(__dirname + "/" + "/site/styles/style_index.css");
});

// scripts js
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
app.get('/scripts/script_global.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_global.js");
});
app.get('/scripts/script_control.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_control.js");
});
app.get('/scripts/script_supervision.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_supervision.js");
});
app.get('/scripts/script_travelling_script.js', function(req, res) {
    res.sendFile(__dirname + "/" + "site/scripts/script_travelling_script.js");
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
    });
    // default stop 
    io.emit('stop');
    // display by default mid speed value
    io.emit('changeSpeed', 5);
    // display controller state
    sendInitialControllerState();
});

io.on('connection', function(socket){
	socket.on('MoveDirection', function(value){
		setMoveDirection(value);
	});
	socket.on('MoveSpeed', function(value){
		setMoveSpeed(value);
	});
	socket.on('RotateDirection', function(value){
		setRotateDirection(value);
	});
	socket.on('RotateSpeed', function(value){
		setRotateSpeed(value);
	});
    
    socket.on('updateAll', function(){
        io.emit('MoveDirection', moveDirection);    
    	io.emit('MoveSpeed', moveSpeed);
        io.emit('MoveDistance', moveDistance);
        io.emit('RotateDirection', rotateDirection);
        io.emit('RotateSpeed', rotateSpeed);
        io.emit('RotateAngle', rotateAngle);
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
        mouveManager.setspeedWagon(valueSpeed);
        io.emit("changeSpeed", mouveManager.getspeedWagon());
    });
    socket.on("setSpeedCamera", function (valueSpeed) {
        log.writeLine("speed camera change to : " +valueSpeed);
        mouveManager.setSpeedRotationCamera(valueSpeed);
        io.emit("setSpeedCamera", valueSpeed);
    })
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

var moveDirection = 0, moveSpeed = 50, moveDistance = 50;
var rotateDirection = 0, rotateSpeed = 50, rotateAngle = 0;

//TRAVELLING CONTROL
function setMoveDirection(value) {
    mouveManager.changeDirection(config);
	moveDirection = value;
	io.emit('MoveDirection', moveDirection);
}
function setMoveSpeed(value) {
    mouveManager.setspeedWagon(value);
	io.emit('MoveSpeed', mouveManager.getspeedWagon());
}

function setMoveDistance(value) {
	value = value < 0 ? 0 : value > 100 ? 100 : value;
    if(moveDistance == value) return false;
    moveDistance = value;
	io.emit('MoveDistance', value);
}

function setRotateDirection(value) {
	rotateDirection = value;
	io.emit('RotateDirection', rotateDirection);
}

function setRotateSpeed(value) {
    mouveManager.setRotateSpeed(value);
	io.emit('RotateSpeed', mouveManager.getSpeedRotationCamera());
}

function setRotateAngle(value) {
	rotateAngle = value;
	io.emit('RotateAngle', rotateAngle);
}

///TEST
setInterval(function(){
	if(moveDirection == -1 && moveDistance >= 0)
	{
		setMoveDistance(parseFloat(moveDistance,10) - parseFloat(moveSpeed/10,10));
	}
	else if(moveDirection == 1)
	{
		setMoveDistance(parseFloat(moveDistance,10) + parseFloat(moveSpeed/10,10));
	}
	if(rotateDirection == -1)
	{
		setRotateAngle(parseFloat(rotateAngle,10) - parseFloat(rotateSpeed/10,10));
	}
	else if(rotateDirection == 1)
	{
		setRotateAngle(parseFloat(rotateAngle,10) + parseFloat(rotateSpeed/10,10));
    }
}, 50);