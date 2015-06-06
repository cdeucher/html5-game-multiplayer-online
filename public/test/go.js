
var userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
var game    = {user:userx};
var oSpiN   = require("./oSpin.js");
var oSoldier = require("./oSoldier.js");
/*
*  Client-server
*/
var io = require('socket.io-client'),
socket = io.connect('http://localhost:8080');

var romanos = new oSpiN({game:game,socket:socket});

socket.on('connect', function () { console.log("socket connected"); });
socket.emit('join', userx, 'x');
socket.on('update', function (data) {
  msg = "";
  if(!isObject(data))
    msg = data;
  else{
    for(i in data){
      msg += ","+data[i];
    }
  }
  console.log('update',msg);
});
socket.on('login', function (user,id) {
    console.log('login');
    console.log('login',user,id);
    socket.emit('server_get_soldier');
    socket.emit('server_update_remote');
});
socket.on('gokill', function (dono) {
    console.log('gokill',dono);
    romanos.remove(dono);
});
socket.on('client_get_soldier', function (data) {
     console.log('client_get_soldier');
    romanos.set_group(data,userx);
});
socket.on('client_update_remote', function (data) {
    romanos.update_remote(data);
});
socket.on('client_atk_soldier', function (data) {
    romanos.atk_soldier(socket,data);
});
/*
*  Actions
*/
romanos.add(userx);


function isObject(val) {
    return (typeof val === 'object');
}
