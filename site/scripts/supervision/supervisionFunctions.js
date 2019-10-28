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
socket.on('controllerConnected', function(msg){
    console.log("Controller connected");
    // label message visible
    $("#labelControllerActif").text("Controller online, can't connect to it for the moment ...");
    $("#labelControllerActif").css("visibility", "visible");
    // not enable button
    $('#adminBtn').prop("disabled", true);
});
socket.on('controllerDisconnected', function(msg){
    console.log("Controller disconnected");
    // label message visible
    $("#labelControllerActif").text("Controller not online, you can connect to it right now !");
    $("#labelControllerActif").css("visibility", "visible");
    // not enable button
    $('#adminBtn').prop("disabled", false);
});
$('#adminBtn').on('click', function() {
    document.location.href="../pages/controllerPage.html"
});