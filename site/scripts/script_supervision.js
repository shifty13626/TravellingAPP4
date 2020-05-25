let sliders, thumbs;
init();
function init(){
	sliders = document.getElementsByClassName("customrange");
  	thumbs = document.getElementsByClassName("sliderthumb");
  	for (let i=0;i<sliders.length;i++){
    	sliders[i].addEventListener("input", function(e){ updateSlider(i,sliders[i].value); });
    	sliders[i].addEventListener("change",function(e){ updateSlider(i,sliders[i].value); });
    	updateSlider(i,sliders[i].value);
  	}
}
function updateSlider(fillindex,val){
  setThumb(thumbs[fillindex],val);
}

function setThumb(elem,val){
  let size = getComputedStyle(elem).getPropertyValue("--thumbsize");
  let newx = `calc(${val}% - ${parseInt(size)/2}vh)`;
  elem.style.left = newx;
}

function setThumbRotation(elem,val){
	val = val - 90;
	let rotation = `rotate(${val}deg)`;
	elem.style.transform = rotation;
}

function setCameraPosition(val){
	for (let i=0;i<sliders.length;i++){
		sliders[i].value = val;
		updateSlider(i,sliders[i].value);
	}
	return true;
}

function setCameraRotation(val){
	for (let i=0;i < thumbs.length; i++){
		setThumbRotation(thumbs[i], val);
	}
	return true;
}

//SUPERVISION CONTROLS

$nudMoveSpeed = document.getElementById("nud_move_speed"),
$nudRotateSpeed = document.getElementById("nud_rotate_speed"),
$rngMoveSpeed = document.getElementById("rng_move_speed"),
$rngRotateSpeed = document.getElementById("rng_rotate_speed"),

$lblMoveDirection = document.getElementsByClassName("label_move_direction"),
$lblMoveSpeed = document.getElementsByClassName("label_move_speed"),
$lblMoveDistance = document.getElementsByClassName("label_move_distance"),
$lblRotateDirection = document.getElementsByClassName("label_rotate_direction"),
$lblRotateSpeed = document.getElementsByClassName("label_rotate_speed"),
$lblRotateAngle = document.getElementsByClassName("label_rotate_angle");

//EVENTS
OnMoveDirectionChanged.push(function(){
	let directionText;
	if(moveDirection < 0) {
		directionText = "LEFT";
	}
	else if(moveDirection == 0) {
		directionText = "STOP";
	}
	else if(moveDirection > 0) {
		directionText = "RIGHT";
	}
	for(let i=0; i < $lblMoveSpeed.length; i++) { $lblMoveDirection[i].innerText = directionText; };
});

OnMoveSpeedChanged.push(function(){
	for(let i=0; i < $lblMoveSpeed.length; i++) { $lblMoveSpeed[i].innerText = moveSpeed; };
});

OnMoveDistanceChanged.push(function(){
	setCameraPosition(moveDistance);
	for(let i=0; i < $lblMoveDistance.length; i++) { $lblMoveDistance[i].innerText = Math.ceil(moveDistance); };
});

OnRotateDirectionChanged.push(function(){
	let directionText;
	if(rotateDirection < 0) {
		directionText = "ANTI-CLOCKWISE";
	}
	else if(rotateDirection == 0) {
		directionText = "STOP";
	}
	else if(rotateDirection > 0) {
		directionText = "CLOCKWISE";
	}
	for(let i=0; i < $lblRotateSpeed.length; i++) { $lblRotateDirection[i].innerText = directionText; };
});

OnRotateSpeedChanged.push(function(){
	for(let i=0; i < $lblRotateSpeed.length; i++) { $lblRotateSpeed[i].innerText = rotateSpeed; };
});

OnRotateAngleChanged.push(function(){
	setCameraRotation(rotateAngle);
	for(let i=0; i < $lblRotateAngle.length; i++) { $lblRotateAngle[i].innerText = Math.ceil(rotateAngle); };
});

socket.emit('updateAll');