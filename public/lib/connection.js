  //var socket = io.connect('http://game-newtxt.rhcloud.com');
  var socket = io.connect('http://game:8080');
  var userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
  var romanos = new oSpiN({game:game,socket:socket});

  socket.on('connect', function () { console.log("socket connected"); });
  socket.emit('join', userx, 'room1');
  socket.on('update', function (data) {
      logme(data);
  });
  socket.on('login', function (user,id) {
      logme('login:'+user);
      //socket.emit('server_get_soldier');
  });
  socket.on('gokill', function (dono) {
      logme('gokill : '+dono);
      romanos.remove(dono);
  });
  socket.on('client_get_soldier', function (data) {
      romanos.set_group(data,userx);
  });
  socket.on('client_update_remote', function (data) {
      romanos.update_remote(data);
  });
  socket.on('client_atk_to', function (data) {
      romanos.atk_to(socket,data);
  });
  socket.on('client_move_to', function (data) {
      romanos.move_to(socket,data);
  });
  socket.on('client_collision_to', function (data) {
      romanos.collision_to(socket,data);
  });
  socket.on('client_kill_to', function (data) {
      romanos.kill_to(socket,data);
  });
  /*
  *  Actions
  */
    //romanos.add({x:230,y:210,type:Math.floor(Math.random() * 4 + 1),dono:userx,base:1});
    //romanos.add({x:230,y:210,type:Math.floor(Math.random() * 4 + 1),dono:userx});
    setInterval(function(){ romanos.update(socket); },1000);
    setTimeout(function(){
        socket.emit('server_get_soldier');
      },1000);
    //console.log("centuria - ",romanos.get_centuria());
  function logme(data){
    msg = "";
    if(!isObject(data))
      msg = data;
    else{
      for(i in data){
        msg += ","+data[i];
      }
    }
    document.getElementById('logx').innerHTML += "<br>"+msg;
    console.log('update',msg);
  }
  function isObject(val) {
      return (typeof val === 'object');
  }
