//SERVER CONTROL
function getMoveDirection()
{
	if(cptMoveBack > 0 && cptMoveFront == 0) return -1;
	else if(cptMoveFront > 0 && cptMoveBack == 0) return 1;
	else return 0;
}
function setMoveDirection(value)
{
	if(value != -1 && value != 0 && value != 1) return false;
	socket.emit('MoveDirection', value);
}
function setMoveSpeed(value)
{
	value = value < 0 ? 0 : value > 100 ? 100 : value;
	if(moveSpeed == value) return false;
	socket.emit('MoveSpeed', value);
}

function getRotateDirection()
{
	if(cptRotateBack > 0 && cptRotateFront == 0) return -1;
	else if(cptRotateFront > 0 && cptRotateBack == 0) return 1;
	else return 0;
}
function setRotateDirection(value)
{
	if(value != -1 && value != 0 && value != 1) return false;
	socket.emit('RotateDirection', value);
}
function setRotateSpeed(value)
{
	value = value < 0 ? 0 : value > 100 ? 100 : value;
	if(rotateSpeed == value) return false;
	socket.emit('RotateSpeed', value);
}


//UX CONTROLS
var $btnMoveBack = document.getElementById("btn_move_back"),
    $btnMoveFront = document.getElementById("btn_move_front"),
    $btnRotateBack = document.getElementById("btn_rotate_back"),
    $btnRotateFront = document.getElementById("btn_rotate_front");

var travButtons = [$btnMoveBack, $btnMoveFront, $btnRotateBack, $btnRotateFront];

//TRAVELLING EVENTS
OnMoveSpeedChanged.push(function(){
	$rngMoveSpeed.value = moveSpeed;
	$nudMoveSpeed.value = moveSpeed;
});

OnRotateSpeedChanged.push(function(){
	$rngRotateSpeed.value = rotateSpeed;
	$nudRotateSpeed.value = rotateSpeed;
});

//UX EVENTS
$nudMoveSpeed.oninput = function(){ setMoveSpeed($nudMoveSpeed.value); };
$rngMoveSpeed.oninput = function(){ setMoveSpeed($rngMoveSpeed.value); };
$nudRotateSpeed.oninput = function(){ setRotateSpeed($nudRotateSpeed.value); };
$rngRotateSpeed.oninput = function(){ setRotateSpeed($rngRotateSpeed.value); };

$nudMoveSpeed.onkeydown = function(event){ event.preventDefault(); };
$rngMoveSpeed.onkeydown = function(event){ event.preventDefault(); };
$nudRotateSpeed.onkeydown = function(event){ event.preventDefault(); };
$rngRotateSpeed.onkeydown = function(event){ event.preventDefault(); };

//MOUSE AND TOUCH
var $pressedControl = null;
travButtons.forEach(function(item, index, array){
	//TACTILE
	item.addEventListener('touchstart', function(event){ event.preventDefault(); press(item, event); });
	item.addEventListener('touchend', function(event){ event.preventDefault(); endPress(item); });
	//MOUSE
	item.onmousedown = function(event){ $pressedControl=item; press(item, event) };
});
window.onmouseup = function(){ endPress($pressedControl); $pressedControl=null; }
function press(control, e) {
	switch(control.id) {
		case("btn_move_back"):
			cptMoveBack++;
			setMoveDirection(getMoveDirection());
		break;
		case("btn_move_front"):
			cptMoveFront++;
			setMoveDirection(getMoveDirection());
		break;
		case("btn_rotate_back"):
			cptRotateBack++;
			setRotateDirection(getRotateDirection());
		break;
		case("btn_rotate_front"):
			cptRotateFront++;
			setRotateDirection(getRotateDirection());
		break;
	}
    return false;
}
function endPress(control) {
	if(control != null) {
		switch(control.id) {
			case("btn_move_back"):
				cptMoveBack--;
				setMoveDirection(getMoveDirection());
			break;
			case("btn_move_front"):
				cptMoveFront--;
				setMoveDirection(getMoveDirection());
			break;
			case("btn_rotate_back"):
				cptRotateBack--;
				setRotateDirection(getRotateDirection());
			break;
			case("btn_rotate_front"):
				cptRotateFront--;
				setRotateDirection(getRotateDirection());
			break;
		}
	}
    return false;
}

//KEYBOARD
let pressedKeys = {};

document.addEventListener("keydown", function(event) {
	if(event.key == "z" || pressedKeys["z"])
		setMoveSpeed(parseInt(moveSpeed,10)+1);
	if(event.key == "s" || pressedKeys["s"])
		setMoveSpeed(parseInt(moveSpeed,10)-1);
	if(event.key == "ArrowUp" || pressedKeys["ArrowUp"])
		setRotateSpeed(parseInt(rotateSpeed,10)+1);
	if(event.key == "ArrowDown" || pressedKeys["ArrowDown"])
		setRotateSpeed(parseInt(rotateSpeed,10)-1);
	if(event.key == "q" && !pressedKeys[event.key]) {
		cptMoveBack++;
		setMoveDirection(getMoveDirection());
	}
	if(event.key == "d" && !pressedKeys[event.key]) {
		cptMoveFront++;
		setMoveDirection(getMoveDirection());
	}
	if(event.key == "ArrowLeft" && !pressedKeys[event.key]) {
		cptRotateBack++;
		setRotateDirection(getRotateDirection());
	}
	if(event.key == "ArrowRight" && !pressedKeys[event.key]) {
		cptRotateFront++;
		setRotateDirection(getRotateDirection());
	}
	pressedKeys[event.key] = true;
}, false);

document.addEventListener("keyup", function(e) {
	delete pressedKeys[event.key];
	switch(event.key)
	{
		case("q"):
			cptMoveBack--;
			setMoveDirection(getMoveDirection());
		break;
		case("d"):
			cptMoveFront--;
			setMoveDirection(getMoveDirection());
		break;
		case("ArrowLeft"):
			cptRotateBack--;
			setRotateDirection(getRotateDirection());
		break;
		case("ArrowRight"):
			cptRotateFront--;
			setRotateDirection(getRotateDirection());
		break;
	}
}, false);

//GAMEPAD
var gamepad, gamepadClock, stickLH = 0, stickRH = 0, oldStickLH = 0, oldStickRH = 0;

window.addEventListener("gamepadconnected", function(e) { console.log("Gamepad connected"); gamepadClock = setInterval(gamepadHandler, 50); });
window.addEventListener("gamepaddisconnected", function(e) { console.log("Gamepad disconnected"); clearInterval(gamepadClock); });
function gamepadHandler()
{
	gamepad = navigator.getGamepads()[0],
	stickLH = gamepad.axes[0],
	stickRH = gamepad.axes[2],
	triggerLS = gamepad.buttons[4],
	triggerRS = gamepad.buttons[5],
	triggerLT = gamepad.buttons[6],
	triggerRT = gamepad.buttons[7];

	if(triggerLS.pressed && !triggerRS.pressed) { setRotateSpeed(rotateSpeed-1); }
	if(triggerRS.pressed && !triggerLS.pressed) { setRotateSpeed(rotateSpeed+1); }
	if(triggerLT.pressed && !triggerRT.pressed) { setMoveSpeed(moveSpeed-1); }
	if(triggerRT.pressed && !triggerLT.pressed) { setMoveSpeed(moveSpeed+1); }

	if(stickLH < -0.5 && oldStickLH >= -0.5) {
		if(oldStickLH > 0.5) cptMoveFront--;
		cptMoveBack++;
		setMoveDirection(getMoveDirection()); 
	}
	else if(stickLH > 0.5 && oldStickLH <= 0.5) {
		if(oldStickLH < -0.5) cptMoveBack--;
		cptMoveFront++;
		setMoveDirection(getMoveDirection()); 
	}
	else if(stickLH >= -0.5 && stickLH <= 0.5 && (oldStickLH < -0.5 || oldStickLH > 0.5)) {
		if(oldStickLH < -0.5) cptMoveBack--;
		else if(oldStickLH > 0.5) cptMoveFront--;
		setMoveDirection(0); 
	}
	
	if(stickRH < -0.5 && oldStickRH >= -0.5) {
		if(oldStickRH > 0.5) cptRotateFront--;
		cptRotateBack++;
		setRotateDirection(getRotateDirection()); 
	}
	else if(stickRH > 0.5 && oldStickRH <= 0.5) {
		if(oldStickRH < -0.5) cptRotateBack--;
		cptRotateFront++;
		setRotateDirection(getRotateDirection()); 
	}
	else if(stickRH >= -0.5 && stickRH <= 0.5 && (oldStickRH < -0.5 || oldStickRH > 0.5)) {
		if(oldStickRH < -0.5) cptRotateBack--;
		else if(oldStickRH > 0.5) cptRotateFront--;
		setRotateDirection(0); 
	}

	oldStickLH = stickLH;
	oldStickRH = stickRH;
}