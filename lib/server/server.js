/*
*   Web Server
*/
var _static = require('node-static');
var file = new _static.Server('../../');
var server = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        //responde as requisições
        file.serve(request, response);
    }).resume();
});
/*
*   Socket Server
*/
io = require('socket.io').listen(server);
var request = require('request');
/*
*   DB
*/
var db     = require('./mongo');

var player = require('./player');
/*
*  trata requests de indaxação
*/
io.sockets.on('connection', function (socket) {
    /*
    *  players
    */
    socket.on('server_get_soldier', function () {
      player.get_soldier(socket,db);
    });
    socket.on('server_set_soldier', function (soldier) {
      player.set_soldier(socket,db,soldier);
    });
    socket.on('server_update_soldier', function (centuria) {
      player.update_soldier(socket,db,centuria);
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port,ipaddress);
