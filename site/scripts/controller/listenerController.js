$(function () {
    // events mouve
    $('#mouveBack').mouseenter(mouveBack);
    $('#mouveBack').mouseleave(stop);
    $('#mouveFront').mouseenter(mouveFront);
    $('#mouveFront').mouseleave(stop);
    $('body').keyup(pressKeyMouve);
    
    // event speed mouve
    $('#slider').change(sendSpeed);
});