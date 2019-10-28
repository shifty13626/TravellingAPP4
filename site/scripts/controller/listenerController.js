$(function () {
    // events mouve
    $('#mouveBack').mouseenter(mouveBack);
    $('#mouveBack').mouseleave(stop);
    $('#mouveFront').mouseenter(mouveFront);
    $('#mouveFront').mouseleave(stop);
    $('body').keyup(pressKeyMouve);
    
    // event speed mouve
    $('#slider').change(sendSpeed);

    // windows close
    window.onbeforeunload = exitController;

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
});

