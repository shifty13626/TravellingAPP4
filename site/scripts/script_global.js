socket = io();

var moveDirection = 0,
cptMoveBack = 0,
cptMoveFront = 0,
moveSpeed = 50,
moveDistance = 50,
rotateDirection = 0,
cptRotateBack = 0,
cptRotateFront = 0,
rotateSpeed = 50,
rotateAngle = 0;

//LIST OF EVENTS
OnMoveDirectionChanged = [],
OnMoveSpeedChanged = [],
OnMoveDistanceChanged = [],

OnRotateDirectionChanged =[],
OnRotateSpeedChanged = [],
OnRotateAngleChanged = [],

OnControlTaken = [],
OnControlReleased = [],

OnTemplateStarted = [],
OnTemplatePaused = [],
OnTemplateEnded = [],
OnTemplateStopped = [],

OnGamepadConnected = [],
OnGamepadDisconnected = [];


function raiseEvent(event) {
    event.forEach(handler => handler());
}

socket.on('MoveDirection', function(value){
    moveDirection = value;
    raiseEvent(OnMoveDirectionChanged);
});
  
socket.on('MoveSpeed', function(value){
    moveSpeed = value;
    raiseEvent(OnMoveSpeedChanged);
});
  
socket.on('MoveDistance', function(value){
    moveDistance = value;
    raiseEvent(OnMoveDistanceChanged);
});
  
socket.on('RotateDirection', function(value){
    rotateDirection = value;
    raiseEvent(OnRotateDirectionChanged);
});
  
socket.on('RotateSpeed', function(value){
    rotateSpeed = value;
    raiseEvent(OnRotateSpeedChanged);
});
  
socket.on('RotateAngle', function(value){
    rotateAngle = value;
    raiseEvent(OnRotateAngleChanged);
});