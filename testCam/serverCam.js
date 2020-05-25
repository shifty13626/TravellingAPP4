var http = require('http');
var CameraStream = require('./cameraStream');

// gestionnaire de camera raspistill
var camera = new CameraStream();
camera.doStart(320,240,6);

// on créer un serveur qui répondra (res) aux requêtes (req)
http.createServer(function(req, res){
    
// entêtes HTTP indiquant un contenu non-fini
res.writeHead(200, { 'Cache-Control': 'no-cache', 'Cache-Control': 'private', 'Pragma': 'no-cache', 'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary', });

// envoyer les images à mesure qu'elles arrivent 
var consume = function(buffer) { 
    res.write("--myboundary\r\n");
    res.write("Content-Type: image/jpeg\r\n");
    res.write("Content-Length: " + buffer.length + "\r\n"); 
    res.write("\r\n"); res.write(buffer,'binary'); 
    res.write("\r\n");
} 

// tenter d'envoyer chaque image dès qu'elle arrive 
camera.on('image', consume);

// la connexion a été coupée 

res.connection.on('close', function(){
    camera.removeListener('image', consume);
    });
}).listen(8080, function(){ console.log('mjpeg server started'); });