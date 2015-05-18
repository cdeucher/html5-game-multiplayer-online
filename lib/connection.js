  var socket = io.connect('http://192.168.119.133:8080');
      socket.on('client_get_soldier', function (data) {
        for (i in data){
          //console.log(data[i]);        
          romanos.add(data[i],socket);
        }
      });
      //conectando
      //setInterval(function(){ socket.emit('server_get_soldier');},1000);
      setInterval(function(){ socket.emit('server_get_soldier');},2100);
      setInterval(function(){
        centuria = romanos.get_centuria();
        for(i in centuria){
          if(centuria[i].dono == socket.id)
            socket.emit('server_update_soldier',{_id:centuria[i]._id,x:centuria[i].soldier.x,y:centuria[i].soldier.y});
        }
      },1000);
