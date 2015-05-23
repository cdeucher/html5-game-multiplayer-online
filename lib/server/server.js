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

function describeRoom(name) {
    var clients = io.sockets.clients(name);
    var result = {
        clients: {}
    };
    clients.forEach(function (client) {
        result.clients[client.id] = client.resources;
    });
    return result;
}
function safeCb(cb) {
    if (typeof cb === 'function') {
        return cb;
    } else {
        return function () {};
    }
}
/*
*   DB
*/
var db     = require('./mongo');

var player = require('./player');
/*
*  trata requests de indaxação
*/
io.sockets.on('connection', function (client) {
    function removeFeed(type) {
        soldier = {id: client.id,type: type};
        console.log(soldier);
        io.sockets.in(client.room).emit('remove', soldier);
    }
    client.on('disconnect', function () {
         removeFeed();
    });
    client.on('leave', removeFeed);
    // broadcast user joining
    client.on('join', function(nick){
      console.log('join',nick);
       //socket.nick = nick;
       //socket.emit('joined');
       //broadcast(socket, 'join', nick);
    });
    client.on('login_room', function(user,room){
           client.user = user;
           client.room = room;
           client.join(room);
           console.log('login',user,room);
           //client.to(room).emit('login', client);
           client.broadcast.to(room).emit('login', user);
    });
    /*
    *  players
    */
    client.on('server_get_soldier', function () {
      player.get_soldier(client,db);
    });
    client.on('server_set_soldier', function (soldier) {
      player.set_soldier(client,db,soldier);
    });
    client.on('server_update_soldier', function (centuria) {
      player.update_soldier(client,db,centuria);
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port,ipaddress);
