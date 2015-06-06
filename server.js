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
*   LIBS
*/
var db        = require('./lib/mongo');
var player    = require('./lib/player');
var groups    = require('./lib/group');

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
        player.delete_soldier(client,db,tmp_remove,false);
    });
    /*
    *  players
    */
    client.on('server_get_soldier', function () {
      player.get_soldier(client,db,people);
    });
    client.on('server_set_soldier', function (soldier) {
      player.set_soldier(client,db,soldier,people,groups);
    });
    client.on('server_update_remote', function (soldier) {
      //player.update_soldier(client,db,soldier,people);
      client.broadcast.emit("client_update_remote",soldier);//update other players
    });
    client.on('server_atk_to', function (data) {
      console.log('server_atk_to',data);
      client.broadcast.emit("client_atk_to",data);//update other players
      client.emit("client_atk_to",data);//update other players
    });
    client.on('server_move_to', function (data) {
      console.log('server_move_to',data);
      client.broadcast.emit("client_move_to",data);//update other players
      client.emit("client_move_to",data);//update other players
    });
    client.on('server_collision_to', function (data) {
      console.log('server_collision_to',data);
      client.broadcast.emit("client_collision_to",data);//update other players
      client.emit("client_collision_to",data);//update other players
    });
    client.on('server_kill_soldier', function (data) {
      console.log('server_kill_soldier',data);
      player.delete_soldier(client,db,false,data);   // delete database
      client.broadcast.emit("client_kill_to",data);//
      client.emit("client_kill_to",data);//update other players
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port,ipaddress);
