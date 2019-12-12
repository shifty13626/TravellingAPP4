/*window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};*/

var socket = io();

var $btnMoveLeft = document.getElementById("btn_move_left"),
    $btnMoveRight = document.getElementById("btn_move_right"),
    $btnRotateLeft = document.getElementById("btn_rotate_left"),
    $btnRotateRight = document.getElementById("btn_rotate_right"),
    
    $nudMoveSpeed = document.getElementById("nud_move_speed"),
    $nudRotateSpeed = document.getElementById("nud_rotate_speed"),
    $rngMoveSpeed = document.getElementById("rng_move_speed"),
    $rngRotateSpeed = document.getElementById("rng_rotate_speed");

var travButtons = [
    $btnMoveLeft,
    $btnMoveRight,
    $btnRotateLeft,
    $btnRotateRight
];

//Link range and number inputs for speed
$nudMoveSpeed.oninput = function(){ $rngMoveSpeed.value = $nudMoveSpeed.value;
socket.emit('setSpeed', $nudMoveSpeed.value);
};
$rngMoveSpeed.oninput = function(){ $nudMoveSpeed.value = $rngMoveSpeed.value; 
socket.emit('setSpeed', $rngMoveSpeed.value);
};

$nudRotateSpeed.oninput = function(){ $rngRotateSpeed.value = $nudRotateSpeed.value; };
$rngRotateSpeed.oninput = function(){ $nudRotateSpeed.value = $rngRotateSpeed.value; };

//On press
document.body.onmouseup = function(){ console.log("MOUSE UP"); endPress(null); }
document.body.ontouchend = function(){ }

travButtons.forEach(function(item, index, array){
    item.ontouchstart = function(event){press(item, event)};
    item.ontouchend = function(event){ endPress(item); event.stopPropagation(); };
    item.onmousedown = function(event){ console.log("MOUSE DOWN"); press(item, event)};
});
//var pressTimeout;
function press(control, e) {
    e.preventDefault();
    //pressTimeout = setInterval(function(){
        console.log(control.id + " pressed");
        if(control.id === "btn_move_left") {
            e.preventDefault(); // prevents page reloading
            socket.emit('mouveBack', "back");
        }
        else if(control.id === "btn_move_right"){
            e.preventDefault(); // prevents page reloading
            socket.emit('mouveFront', "front");
        }
    //}, 100);
    return false;
}
function endPress(item) {
    //e.preventDefault(); // prevents page reloading
    //clearInterval(pressTimeout);
    socket.emit('stop', "stop");
    if(control != null)
	{
		console.log(control.id + " released");
	}
	else console.log("STOP");
    return false;
}

//Gamepad management
window.addEventListener("gamepadconnected", function(e) {
    console.log("Controleur #%d connecte : %s. %d boutons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Controleur #%d deconnecte : %s", e.gamepad.index, e.gamepad.id);
});
