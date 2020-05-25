let sliders, thumbs;
document.addEventListener('DOMContentLoaded', function (e) { init();});

function init(){
  sliders = document.querySelectorAll(".customrange");
  thumbs = document.querySelectorAll(".sliderthumb");
  /* We need to change slider appearance to respond to both input and change events. */
  for (let i=0;i<sliders.length;i++){
    sliders[i].addEventListener("input",function(e){
      updateSlider(i,sliders[i].value);});
    sliders[i].addEventListener("change",function(e){
      updateSlider(i,sliders[i].value);});
    //update each slider
    updateSlider(i,sliders[i].value);
  }
}
function updateSlider(fillindex,val){
  setThumb(thumbs[fillindex],val);
}

function setThumb(elem,val){
  let size = getComputedStyle(elem).getPropertyValue("--thumbsize");
  let newx = `calc(${val}% - ${parseInt(size)/2}px)`;
  elem.style.left = newx;
}
function setCameraPosition(val){
	for (let i=0;i<sliders.length;i++){
		sliders[i].value = val;
		updateSlider(i,sliders[i].value);
	}
	return true;
}

function setThumbRotation(elem,val){
	val = val - 90;
	let rotation = `rotate(calc(${val}deg)`;
	elem.style.transform = rotation;
}
function setCameraRotation(val){
	for (let i=0;i<thumbs.length;i++){
		setThumbRotation(thumbs[i], val);
	}
	return true;
}