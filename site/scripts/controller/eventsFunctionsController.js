var socket = io();

// mouve function
function mouveBack(e){
    console.log("mouse back");
    e.preventDefault(); // prevents page reloading
    socket.emit('mouveBack', "back");
    return false;
};

function mouveFront(e){
    console.log("mouse front");
    e.preventDefault(); // prevents page reloading
    socket.emit('mouveFront', "front");
    return false;
};

function stop(e){
    console.log("stop");
    e.preventDefault(); // prevents page reloading
    socket.emit('stop', "stop");
    return false;
};

function pressKeyMouve(e){
    if (e.keyCode == 37)
    {
        stop(e);
        mouveBack(e);
    }
    else if(e.keyCode == 39)
    {
        stop(e);
        mouveFront(e);
    }
    else if(e.keyCode == 32)
        stop(e);
};

function sendSpeed(e) {
    var speed = $('#slider').val;
    console.log("Send speed " +speed + " to server.");
    e.preventDefault(); // prevents page reloading
    socket.emit('setSpeed', speed);
    return false;
}

// listener socket
socket.on('mouveBack', function(msg){
    $('#arrowBack').css("visibility", "visible");
    $('#stopMouve').css("visibility", "hidden");
    $('#arrowFront').css("visibility", "hidden");
});
socket.on('mouveFront', function(msg){
    $('#arrowBack').css("visibility", "hidden");
    $('#stopMouve').css("visibility", "hidden");
    $('#arrowFront').css("visibility", "visible");
});
socket.on('stop', function(msg){
    $('#arrowBack').css("visibility", "hidden");
    $('#stopMouve').css("visibility", "visible");
    $('#arrowFront').css("visibility", "hidden");
});