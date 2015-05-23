  var socket = io.connect('http://192.168.119.133:8080');
      socket.on('client_get_soldier', function (data) {
        //for (i in data){          
          romanos.add(data);

        //}
      });
      socket.on('update', function (client) {
          console.log('update',client);
      });
      socket.on('login', function (user,id) {
          console.log('login',user,id);
          socket.emit('server_get_soldier');
      });
      socket.on('gokill', function (dono) {
          console.log('gokill',dono);
          romanos.remove(dono);
      });
      //conectando
      //setTimeout(function(){ socket.emit('server_get_soldier');},1000);
      //setInterval(function(){ socket.emit('server_get_soldier');},2100);
