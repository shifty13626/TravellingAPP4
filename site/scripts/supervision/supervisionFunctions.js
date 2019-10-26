var socket = io();

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
socket.on('changeSpeed', function(value) {
    console.log("Recev value speed : " +value);
    $('#speedLabel').html(value);
});