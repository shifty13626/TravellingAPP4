/*window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};*/

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
$nudMoveSpeed.oninput = function(){ $rngMoveSpeed.value = $nudMoveSpeed.value; };
$rngMoveSpeed.oninput = function(){ $nudMoveSpeed.value = $rngMoveSpeed.value; };

$nudRotateSpeed.oninput = function(){ $rngRotateSpeed.value = $nudRotateSpeed.value; };
$rngRotateSpeed.oninput = function(){ $nudRotateSpeed.value = $rngRotateSpeed.value; };

//On press
document.body.onmouseup = function(){endPress(); }
// document.body.ontouchend = function(){endPress(); }
var $pressedControl;

travButtons.forEach(function(item, index, array){
    item.ontouchstart = function(event){press(item, event)};
    item.ontouchend = function(event){endPress();};
    item.onmousedown = function(event){press(item, event)};
});
var pressTimeout;
function press(control, e) {
    e.preventDefault();
    $pressedControl = control;
    pressTimeout = setInterval(function(){
        console.log(control.id + " pressed");
    }, 100);
    return false;
}
function endPress() {
    clearInterval(pressTimeout);
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