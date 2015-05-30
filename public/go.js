
var userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
var game    = {user:userx};
var oSpiN   = require("./test/oSpin.js");
var oSoldier = require("./test/oSoldier.js");
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
    console.log('login',user,id);
    //socket.emit('server_get_soldier');
});
socket.on('gokill', function (dono) {
    console.log('gokill',dono);
    romanos.remove(dono);
});
socket.on('client_get_soldier', function (data) {
    romanos.set_group(data,userx);
});

/*
*  Actions
*/
  romanos.add({x:230,y:210,type:Math.floor(Math.random() * 4 + 1),dono:userx,base:{x:30,y:120}});
  //romanos.add({x:230,y:210,type:Math.floor(Math.random() * 4 + 1),dono:userx});
  setInterval(function(){ romanos.update(userx,socket); },5000);
  //console.log("centuria - ",romanos.get_centuria());

function isObject(val) {
    return (typeof val === 'object');
}
