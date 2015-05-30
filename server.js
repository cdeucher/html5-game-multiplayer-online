/*
*   Web Server
*/
var _static = require('node-static');
var file = new _static.Server('./public');
var server = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        //responde as requisições
        file.serve(request, response);
    }).resume();
});
/*
*   Socket Server
*/
socket = require('socket.io').listen(server);
var request = require('request');
/*
*   DB
*/
var db     = require('./lib/mongo');
var player = require('./lib/player');

var people = {};

socket.on("connection", function (client) {
    client.on("join", function(name,room){
        console.log("connected ",name);
        people[client.id] = name;
        client.broadcast.emit("update", name + " has joined the server.");//update others
        client.emit("update", "You has joined the server.");//update you
        client.emit("login", name, room);//update you
    });
    client.on("disconnect", function(){
        tmp_remove =  people[client.id];
        client.broadcast.emit("update", tmp_remove + " has left the server.");
        client.broadcast.emit("gokill", tmp_remove);
        delete people[client.id];
        player.delete_soldier(client,db,tmp_remove);
    });
    /*
    *  players
    */
    client.on('server_get_soldier', function () {
      player.get_soldier(client,db,people);
    });
    client.on('server_set_soldier', function (soldier) {
      player.set_soldier(client,db,soldier,people);
    });
    client.on('server_update_soldier', function (soldier) {
      player.update_soldier(client,db,soldier,people);
    });
    client.on('server_to_go', function (soldier,enemy) {
      //console.log(data);
      client.broadcast.emit("client_to_go",soldier,enemy);
      //client.emit("client_to_go",data);
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port,ipaddress);
